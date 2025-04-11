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
    try {
        const response = await fetch(API_CONFIG.url, {
            method: 'GET',
            headers: API_CONFIG.headers
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching leaderboard data:', error);
        // Return mock data for testing
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
function transformLeaderboardData(apiData) {
    if (!apiData || !apiData.leaderboard) {
        return [];
    }

    return apiData.leaderboard.map(player => ({
        position: player.position,
        name: player.player_name,
        scoreToPar: player.total_to_par,
        round1: player.round1_score,
        round2: player.round2_score,
        round3: player.round3_score,
        round4: player.round4_score,
        cut: player.status === 'CUT'
    }));
}

// Function to update the leaderboard data
async function updateLeaderboardData() {
    const data = await fetchLeaderboardData();
    if (!data) {
        console.error('Failed to fetch leaderboard data');
        return;
    }

    mastersData = transformLeaderboardData(data);
    return mastersData;
}

// Initialize the data when the script loads
updateLeaderboardData();

// Export the data and functions for use in other scripts
window.mastersData = mastersData;
window.updateLeaderboardData = updateLeaderboardData; 