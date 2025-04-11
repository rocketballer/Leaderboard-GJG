// API configuration
const API_CONFIG = {
    url: 'https://golf-leaderboard-data.p.rapidapi.com/masters/2025',
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
        if (!data || !data.results || !data.results.leaderboard) {
            console.error('Invalid API response format:', data);
            // Since we can't get 2025 data yet, let's create mock data for testing
            return createMockMastersData();
        }

        // Transform the leaderboard data
        const transformedData = transformLeaderboardData(data.results.leaderboard);
        console.log('Transformed data:', transformedData);
        
        return transformedData;
    } catch (error) {
        console.error('Error fetching leaderboard data:', error);
        // Since we can't get 2025 data yet, let's create mock data for testing
        return createMockMastersData();
    }
}

// Function to create mock Masters 2025 data
function createMockMastersData() {
    return [
        {
            position: 1,
            name: "Scottie Scheffler",
            total: "-8",
            today: "-4",
            thru: "F",
            round1: "-2",
            round2: "-1",
            round3: "-1",
            round4: "-4",
            status: "active"
        },
        {
            position: 2,
            name: "Brooks Koepka",
            total: "-6",
            today: "-3",
            thru: "F",
            round1: "-1",
            round2: "-1",
            round3: "-1",
            round4: "-3",
            status: "active"
        },
        {
            position: "T3",
            name: "Jon Rahm",
            total: "-4",
            today: "-2",
            thru: "F",
            round1: "E",
            round2: "-1",
            round3: "-1",
            round4: "-2",
            status: "active"
        },
        {
            position: "T3",
            name: "Rory McIlroy",
            total: "-4",
            today: "-1",
            thru: "F",
            round1: "-1",
            round2: "-1",
            round3: "-1",
            round4: "-1",
            status: "active"
        },
        {
            position: "T5",
            name: "Jordan Spieth",
            total: "-3",
            today: "-2",
            thru: "F",
            round1: "E",
            round2: "-1",
            round3: "E",
            round4: "-2",
            status: "active"
        }
    ];
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
        // Log the complete player object for debugging
        console.log('Processing player:', JSON.stringify(player, null, 2));
        
        // Extract player data from the API response format
        const firstName = player.first_name || 'Unknown';
        const lastName = player.last_name || 'Unknown';
        const position = player.position || 'Unknown';
        const total = player.total_to_par || 'E';
        const status = player.status || 'active';
        const holesPlayed = player.holes_played || 0;
        
        // Get round scores from the rounds array
        const rounds = player.rounds || [];
        console.log('Player rounds:', rounds);
        
        // Extract round scores with proper error handling
        let round1 = 'E';
        let round2 = 'E';
        let round3 = 'E';
        let round4 = 'E';
        
        if (Array.isArray(rounds)) {
            rounds.forEach(round => {
                const score = round.total_to_par;
                switch(round.round_number) {
                    case 1: round1 = score; break;
                    case 2: round2 = score; break;
                    case 3: round3 = score; break;
                    case 4: round4 = score; break;
                }
            });
        }
        
        // Calculate today's score (round 4)
        const today = round4;

        const transformedPlayer = {
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
        
        console.log('Transformed player:', transformedPlayer);
        return transformedPlayer;
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

    // The data is already transformed in fetchLeaderboardData
    mastersData = data;
    console.log('Updated mastersData:', mastersData);
    return mastersData;
}

// Initialize the data when the script loads
updateLeaderboardData();

// Export the data and functions for use in other scripts
window.mastersData = mastersData;
window.updateLeaderboardData = updateLeaderboardData; 