// API configuration
const API_CONFIG = {
    url: 'https://golf-leaderboard-data.p.rapidapi.com/leaderboard/25',
    headers: {
        'x-rapidapi-host': 'golf-leaderboard-data.p.rapidapi.com',
        'x-rapidapi-key': '99f110f056msh3c3016b9a453a90p131100jsn64367f516c61'
    }
};

// Global variable to store the leaderboard data
let mastersData = [];

// Function to fetch leaderboard data from RapidAPI
async function fetchLeaderboardData() {
    console.log('Fetching data from API...');
    try {
        const response = await fetch(API_CONFIG.url, {
            method: 'GET',
            headers: API_CONFIG.headers
        });

        console.log('API Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response data:', data);
        console.log('API Response structure:', JSON.stringify(data, null, 2));

        // Check if we have the expected data structure
        if (!data || !data.leaderboard) {
            console.error('Invalid API response format:', data);
            // Try to find the leaderboard data in a different location
            if (data.results && data.results.leaderboard) {
                console.log('Found leaderboard data in data.results.leaderboard');
                return transformLeaderboardData(data.results.leaderboard);
            } else if (Array.isArray(data)) {
                console.log('Data is directly an array of players');
                return transformLeaderboardData(data);
            }
            return [];
        }

        // Transform the leaderboard data
        const transformedData = transformLeaderboardData(data.leaderboard);
        console.log('Transformed data:', transformedData);
        
        return transformedData;
    } catch (error) {
        console.error('Error fetching leaderboard data:', error);
        // Return mock data for testing
        console.log('Using mock data instead');
        return {
            leaderboard: [
                { position: "1", player_name: "Justin Rose", total_to_par: "-8", round1_score: 68, round2_score: 68, status: "ACTIVE" },
                { position: "2", player_name: "Bryson DeChambeau", total_to_par: "-7", round1_score: 71, round2_score: 68, status: "ACTIVE" },
                { position: "T3", player_name: "Scottie Scheffler", total_to_par: "-4", round1_score: 72, round2_score: 70, status: "ACTIVE" }
            ]
        };
    }
}

// Function to transform API data to our format
function transformLeaderboardData(data) {
    console.log('Transforming data:', data);
    
    // Check if data is an array
    if (!Array.isArray(data)) {
        console.error('Expected array of players, got:', typeof data);
        return [];
    }

    return data.map(player => {
        // Log the player object to see its structure
        console.log('Processing player:', player);
        
        // Extract player data from the API response format
        const firstName = player.first_name || 'Unknown';
        const lastName = player.last_name || 'Unknown';
        const position = player.position || 'Unknown';
        const total = player.total_to_par || 'E';
        const status = player.status || 'active';
        const holesPlayed = player.holes_played || 0;
        
        // Get round scores from the rounds array
        const rounds = player.rounds || [];
        const round1 = rounds.find(r => r.round_number === 1)?.total_to_par || 'E';
        const round2 = rounds.find(r => r.round_number === 2)?.total_to_par || 'E';
        const round3 = rounds.find(r => r.round_number === 3)?.total_to_par || 'E';
        const round4 = rounds.find(r => r.round_number === 4)?.total_to_par || 'E';
        
        // Calculate today's score (round 4)
        const today = round4;

        return {
            position,
            name: `${firstName} ${lastName}`,
            total,
            today,
            thru: holesPlayed === 18 ? 'F' : holesPlayed.toString(),
            round1,
            round2,
            round3,
            round4,
            status
        };
    });
}

// Function to update the leaderboard data
async function updateLeaderboardData() {
    console.log('Updating leaderboard data...');
    const data = await fetchLeaderboardData();
    if (!data) {
        console.error('Failed to fetch leaderboard data');
        return;
    }

    mastersData = transformLeaderboardData(data);
    console.log('Updated mastersData:', mastersData);
    return mastersData;
}

// Initialize the data when the script loads
updateLeaderboardData();

// Export the data and functions for use in other scripts
window.mastersData = mastersData;
window.updateLeaderboardData = updateLeaderboardData; 