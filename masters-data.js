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

// Update the leaderboard table with new data
function updateLeaderboardTable(data) {
    const tbody = document.querySelector('#masters-leaderboard tbody');
    if (!tbody) {
        console.error('Could not find leaderboard table body');
        return;
    }

    // Clear existing rows
    tbody.innerHTML = '';

    // Add new rows
    data.forEach(player => {
        const row = document.createElement('tr');
        
        // Add position
        const positionCell = document.createElement('td');
        positionCell.textContent = player.position || '-';
        row.appendChild(positionCell);

        // Add player name
        const nameCell = document.createElement('td');
        nameCell.textContent = player.playerName;
        if (player.isAmateur) {
            const amateurBadge = document.createElement('span');
            amateurBadge.className = 'badge bg-success ms-2';
            amateurBadge.textContent = 'A';
            nameCell.appendChild(amateurBadge);
        }
        row.appendChild(nameCell);

        // Add total to par
        const totalCell = document.createElement('td');
        totalCell.textContent = player.total;
        row.appendChild(totalCell);

        // Add thru
        const thruCell = document.createElement('td');
        thruCell.textContent = player.thru;
        row.appendChild(thruCell);

        // Add today's score
        const todayCell = document.createElement('td');
        todayCell.textContent = player.currentRoundScore;
        row.appendChild(todayCell);

        // Add round scores
        const round1Cell = document.createElement('td');
        round1Cell.textContent = player.round1 || '-';
        row.appendChild(round1Cell);

        const round2Cell = document.createElement('td');
        round2Cell.textContent = player.round2 || '-';
        row.appendChild(round2Cell);

        const round3Cell = document.createElement('td');
        round3Cell.textContent = player.round3 || '-';
        row.appendChild(round3Cell);

        const round4Cell = document.createElement('td');
        round4Cell.textContent = player.round4 || '-';
        row.appendChild(round4Cell);

        // Add total strokes
        const totalStrokesCell = document.createElement('td');
        totalStrokesCell.textContent = player.totalStrokes;
        row.appendChild(totalStrokesCell);

        // Add status
        const statusCell = document.createElement('td');
        statusCell.textContent = player.status;
        row.appendChild(statusCell);

        tbody.appendChild(row);
    });
}

// Update the last updated timestamp
function updateLastUpdatedTimestamp(timestamp) {
    const lastUpdatedElement = document.getElementById('last-updated');
    if (!lastUpdatedElement) {
        console.error('Could not find last-updated element');
        return;
    }

    // Convert timestamp to readable date format
    const date = new Date(parseInt(timestamp));
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: '2-digit', 
        timeZoneName: 'short',
        hour12: true
    };
    
    const formattedDate = date.toLocaleString('en-US', options);
    lastUpdatedElement.textContent = formattedDate;
}

// Transform API data to our format
function transformLeaderboardData(data) {
    console.log('API Response data:', data);
    console.log('API Response structure:', JSON.stringify(data, null, 2));
    
    if (!data || !data.leaderboardRows || !Array.isArray(data.leaderboardRows)) {
        console.error('Invalid API response format:', data);
        return [];
    }

    // Update the last updated timestamp if available
    if (data.lastUpdated && data.lastUpdated.$date && data.lastUpdated.$date.$numberLong) {
        updateLastUpdatedTimestamp(data.lastUpdated.$date.$numberLong);
    }

    return data.leaderboardRows.map(player => {
        // Extract position number from position string (e.g., "T3" -> 3)
        const positionMatch = player.position.match(/\d+/);
        const position = positionMatch ? parseInt(positionMatch[0]) : null;

        // Get round scores
        const rounds = player.rounds || [];
        let round1 = '-';
        let round2 = '-';
        let round3 = '-';
        let round4 = '-';

        rounds.forEach(round => {
            const roundNum = parseInt(round.roundId.$numberInt);
            const score = round.scoreToPar;
            switch(roundNum) {
                case 1: round1 = score; break;
                case 2: round2 = score; break;
                case 3: round3 = score; break;
                case 4: round4 = score; break;
            }
        });

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
            position: player.position || '-',
            playerName: `${player.firstName} ${player.lastName}`,
            total: player.total || 'E',
            thru: player.thru || '0',
            currentRoundScore: player.currentRoundScore || 'E',
            round1,
            round2,
            round3,
            round4,
            totalStrokes: player.totalStrokesFromCompletedRounds || '0',
            status: status,
            isAmateur: player.isAmateur || false
        };
    }).sort((a, b) => {
        // Sort by position (non-numeric positions go to the end)
        if (a.position === '-' && b.position === '-') return 0;
        if (a.position === '-') return 1;
        if (b.position === '-') return -1;
        return parseInt(a.position) - parseInt(b.position);
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