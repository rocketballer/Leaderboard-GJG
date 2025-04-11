// API configuration
const API_CONFIG = {
    url: 'https://live-golf-data.p.rapidapi.com/leaderboard?orgId=1&tournId=014&year=2025',
    headers: {
        'x-rapidapi-host': 'live-golf-data.p.rapidapi.com',
        'x-rapidapi-key': '99f110f056msh3c3016b9a453a90p131100jsn64367f516c61'
    }
};

// Tournament information
const TOURNAMENT_INFO = {
    id: "014",
    name: "Masters Tournament",
    date: {
        start: "2025-04-10T00:00:00Z",
        end: "2025-04-13T00:00:00Z"
    },
    weekNumber: "15",
    format: "stroke",
    purse: 20000000,
    winnersShare: 3600000,
    fedexCupPoints: 750
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
            return [];
        }

        // Transform the leaderboard data
        const transformedData = transformLeaderboardData(data.results.leaderboard);
        console.log('Transformed data:', transformedData);
        
        return transformedData;
    } catch (error) {
        console.error('Error fetching leaderboard data:', error);
        return [];
    }
}

// Transform API data to our format
function transformLeaderboardData(data) {
    console.log('API Response data:', data);
    console.log('API Response structure:', JSON.stringify(data, null, 2));
    
    if (!data || !data.leaderboardRows || !Array.isArray(data.leaderboardRows)) {
        console.error('Invalid API response format:', data);
        return [];
    }

    return data.leaderboardRows.map(player => {
        // Extract position number from position string (e.g., "T3" -> 3)
        const positionMatch = player.position.match(/\d+/);
        const position = positionMatch ? parseInt(positionMatch[0]) : null;

        // Calculate total strokes
        const totalStrokes = player.totalStrokesFromCompletedRounds || '0';

        // Get current round score
        const currentRoundScore = player.currentRoundScore || '0';

        // Get status
        let status = 'Active';
        if (player.status === 'complete') {
            status = 'Complete';
        } else if (player.status === 'cut') {
            status = 'Cut';
        } else if (player.status === 'withdrawn') {
            status = 'WD';
        }

        return {
            position: position,
            playerName: `${player.firstName} ${player.lastName}`,
            totalStrokes: parseInt(totalStrokes),
            currentRoundScore: parseInt(currentRoundScore),
            status: status,
            isAmateur: player.isAmateur || false,
            teeTime: player.teeTime || 'TBD',
            currentRound: parseInt(player.currentRound) || 1,
            thru: player.thru || '0',
            total: player.total || '0'
        };
    }).sort((a, b) => {
        // Sort by position (null positions go to the end)
        if (a.position === null && b.position === null) return 0;
        if (a.position === null) return 1;
        if (b.position === null) return -1;
        return a.position - b.position;
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