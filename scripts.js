// API configuration
const API_CONFIG = {
    url: 'https://golf-leaderboard-data.p.rapidapi.com/leaderboard/25',
    headers: {
        'x-rapidapi-host': 'golf-leaderboard-data.p.rapidapi.com',
        'x-rapidapi-key': '99f110f056msh3c3016b9a453a90p131100jsn64367f516c61'
    }
};

// Function to fetch leaderboard data
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
        return null;
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

// Function to update the leaderboard display
async function updateLeaderboard() {
    const data = await fetchLeaderboardData();
    if (!data) {
        console.error('Failed to fetch leaderboard data');
        return;
    }

    const transformedData = transformLeaderboardData(data);
    mastersData.length = 0; // Clear existing data
    mastersData.push(...transformedData); // Add new data

    // Update the display
    updateLeaderboardDisplay();
}

// Update the display when the page loads
document.addEventListener('DOMContentLoaded', () => {
    updateLeaderboard();
    // Refresh data every 5 minutes
    setInterval(updateLeaderboard, 5 * 60 * 1000);
});

// Masters Tournament mock data
const mastersData = [
    { position: "1", name: "Justin Rose", scoreToPar: "-8", round1: 68, round2: 68, round3: null, round4: null, cut: false },
    { position: "2", name: "Bryson DeChambeau", scoreToPar: "-7", round1: 71, round2: 68, round3: null, round4: null, cut: false },
    { position: "T3", name: "Scottie Scheffler", scoreToPar: "-4", round1: 72, round2: 70, round3: null, round4: null, cut: false },
    { position: "T3", name: "Ludvig Åberg", scoreToPar: "-4", round1: 73, round2: 69, round3: null, round4: null, cut: false },
    { position: "T5", name: "Tommy Fleetwood", scoreToPar: "-3", round1: 73, round2: 70, round3: null, round4: null, cut: false },
    { position: "T5", name: "Xander Schauffele", scoreToPar: "-3", round1: 72, round2: 71, round3: null, round4: null, cut: false },
    { position: "T7", name: "Patrick Cantlay", scoreToPar: "-2", round1: 73, round2: 70, round3: null, round4: null, cut: false },
    { position: "T7", name: "Hideki Matsuyama", scoreToPar: "-2", round1: 70, round2: 73, round3: null, round4: null, cut: false },
    { position: "T9", name: "Justin Thomas", scoreToPar: "-1", round1: 74, round2: 69, round3: null, round4: null, cut: false },
    { position: "T9", name: "Jon Rahm", scoreToPar: "-1", round1: 73, round2: 70, round3: null, round4: null, cut: false },
    { position: "T11", name: "Viktor Hovland", scoreToPar: "E", round1: 72, round2: 73, round3: null, round4: null, cut: false },
    { position: "T11", name: "Will Zalatoris", scoreToPar: "E", round1: 70, round2: 73, round3: null, round4: null, cut: false },
    { position: "T14", name: "Brooks Koepka", scoreToPar: "+1", round1: 71, round2: 69, round3: null, round4: null, cut: false },
    { position: "T14", name: "Cameron Smith", scoreToPar: "+1", round1: 72, round2: 73, round3: null, round4: null, cut: false },
    { position: "MC", name: "Jordan Spieth", scoreToPar: "+5", round1: 75, round2: 74, round3: null, round4: null, cut: true },
    { position: "MC", name: "Rory McIlroy", scoreToPar: "+4", round1: 74, round2: 74, round3: null, round4: null, cut: true },
    { position: "MC", name: "Phil Mickelson", scoreToPar: "+6", round1: 75, round2: 76, round3: null, round4: null, cut: true },
    { position: "MC", name: "Tiger Woods", scoreToPar: "+7", round1: 76, round2: 75, round3: null, round4: null, cut: true }
];

// Pool participants mock data
const participantsData = [
    { name: "John Smith", picks: ["Scottie Scheffler", "Rory McIlroy", "Jon Rahm"] },
    { name: "Sarah Johnson", picks: ["Xander Schauffele", "Justin Thomas", "Collin Morikawa"] },
    { name: "Mike Wilson", picks: ["Viktor Hovland", "Patrick Cantlay", "Sam Burns"] },
    { name: "Emily Davis", picks: ["Tony Finau", "Jordan Spieth", "Tiger Woods"] }
];

// Initialize the application when DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Update the Masters Tournament leaderboard
    if (document.getElementById('masters-leaderboard')) {
        populateMastersLeaderboard();
        document.getElementById('refresh-btn').addEventListener('click', populateMastersLeaderboard);
    }
    
    // Update the Pool leaderboard
    if (document.getElementById('pool-leaderboard')) {
        populatePoolLeaderboard();
        document.getElementById('pool-refresh-btn').addEventListener('click', populatePoolLeaderboard);
    }

    // Update timestamps
    updateTimestamps();
});

// Populate the Masters Tournament leaderboard
function populateMastersLeaderboard() {
    const tableBody = document.querySelector('#masters-leaderboard tbody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    mastersData.forEach(player => {
        const row = document.createElement('tr');
        
        // If player missed the cut, add the missed-cut class
        if (player.cut === "CUT") {
            row.classList.add('missed-cut');
        }
        
        row.innerHTML = `
            <td>${player.position}</td>
            <td>${player.name}</td>
            <td class="${getScoreClass(player.scoreToPar)}">${player.scoreToPar}</td>
            <td>${player.round1}</td>
            <td>${player.round2}</td>
            <td>${player.round3}</td>
            <td>${player.round4}</td>
        `;
        
        tableBody.appendChild(row);
    });
    
    updateTimestamps();
}

// Populate the Pool leaderboard
function populatePoolLeaderboard() {
    const tableBody = document.querySelector('#pool-leaderboard tbody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    // Calculate scores for each participant
    const participantScores = calculateParticipantScores();
    
    // Sort by total score (ascending)
    participantScores.sort((a, b) => {
        // Convert scores to numbers for comparison
        const scoreA = parseScoreToNumber(a.totalScore);
        const scoreB = parseScoreToNumber(b.totalScore);
        return scoreA - scoreB;
    });
    
    // Assign ranks
    let currentRank = 1;
    let previousScore = null;
    let skipCount = 0;
    
    participantScores.forEach((participant, index) => {
        const currentScore = parseScoreToNumber(participant.totalScore);
        
        // If this score is different from the previous one, assign a new rank
        if (previousScore !== null && currentScore !== previousScore) {
            currentRank = currentRank + skipCount + 1;
            skipCount = 0;
        } else if (index > 0) {
            skipCount++;
        }
        
        participant.rank = currentRank;
        previousScore = currentScore;
        
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${participant.rank}</td>
            <td><a href="#" class="participant-link" data-name="${participant.name}">${participant.name}</a></td>
            <td class="${getScoreClass(participant.totalScore)}">${participant.totalScore}</td>
            <td>${participant.groupsSurvived}</td>
            <td><span class="status-${participant.status.toLowerCase()}">${participant.status}</span></td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Add event listeners to participant links
    document.querySelectorAll('.participant-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const participantName = this.getAttribute('data-name');
            displayParticipantDetails(participantName);
        });
    });
    
    updateTimestamps();
}

// Calculate scores for each participant
function calculateParticipantScores() {
    return participantsData.map(participant => {
        // Calculate how many groups survived
        const groupsSurvived = countSurvivedGroups(participant.picks);
        
        // Determine status
        const status = groupsSurvived >= 7 ? 'Active' : 'Eliminated';
        
        // Calculate total score
        const totalScore = calculateTotalScore(participant.picks, groupsSurvived);
        
        return {
            name: participant.name,
            groupsSurvived: groupsSurvived,
            status: status,
            totalScore: totalScore,
            picks: participant.picks
        };
    });
}

// Count how many of a participant's player groups survived the cut
function countSurvivedGroups(playerList) {
    return playerList.filter(playerName => {
        const playerData = mastersData.find(p => p.name === playerName);
        return playerData && playerData.cut !== "CUT";
    }).length;
}

// Calculate the total score for a participant
function calculateTotalScore(playerList, groupsSurvived) {
    // Get scores for each player
    const playerScores = playerList.map(playerName => {
        const playerData = mastersData.find(p => p.name === playerName);
        if (!playerData) return null;
        return {
            name: playerName,
            score: playerData.scoreToPar,
            madeCut: playerData.cut !== "CUT"
        };
    }).filter(p => p !== null);
    
    // Convert score strings to numbers for calculation
    const numericScores = playerScores.map(p => ({
        ...p,
        numericScore: parseScoreToNumber(p.score)
    }));
    
    // Sort scores from best (lowest) to worst (highest)
    numericScores.sort((a, b) => a.numericScore - b.numericScore);
    
    // For participants with 7+ surviving groups, take the best 7 scores
    let totalScore = 0;
    if (groupsSurvived >= 7) {
        // Get the best 7 scores from players who made the cut
        const survivingScores = numericScores
            .filter(p => p.madeCut)
            .slice(0, 7)
            .reduce((sum, p) => sum + p.numericScore, 0);
        
        totalScore = survivingScores;
    } else {
        // Sum all scores
        totalScore = numericScores.reduce((sum, p) => sum + p.numericScore, 0);
    }
    
    // Format the total score
    return formatScore(totalScore);
}

// Display detailed information for a selected participant
function displayParticipantDetails(participantName) {
    const participant = participantsData.find(p => p.name === participantName);
    if (!participant) return;
    
    // Find player data for each of the participant's selections
    const playerDetails = participant.picks.map(playerName => {
        const playerData = mastersData.find(p => p.name === playerName);
        if (!playerData) return {
            name: playerName,
            score: "N/A",
            madeCut: false,
            position: "N/A"
        };
        
        return {
            name: playerName,
            score: playerData.scoreToPar,
            madeCut: playerData.cut !== "CUT",
            position: playerData.position
        };
    });
    
    // Calculate participant stats
    const groupsSurvived = countSurvivedGroups(participant.picks);
    const status = groupsSurvived >= 7 ? 'Active' : 'Eliminated';
    const totalScore = calculateTotalScore(participant.picks, groupsSurvived);
    
    // Sort player details by score (best to worst)
    playerDetails.sort((a, b) => {
        return parseScoreToNumber(a.score) - parseScoreToNumber(b.score);
    });
    
    // Create the details HTML
    const detailsContainer = document.getElementById('participant-details');
    if (!detailsContainer) return;
    
    let detailsHTML = `
        <div class="card">
            <div class="card-header bg-success text-white">
                <h4>${participant.name}</h4>
                <div class="d-flex justify-content-between">
                    <span>Total Score: <span class="${getScoreClass(totalScore)}">${totalScore}</span></span>
                    <span>Groups Survived: ${groupsSurvived}/12</span>
                    <span>Status: <span class="status-${status.toLowerCase()}">${status}</span></span>
                </div>
            </div>
            <div class="card-body">
                <h5>Player Selections</h5>
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Position</th>
                                <th>Player</th>
                                <th>Score</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
    `;
    
    playerDetails.forEach(player => {
        detailsHTML += `
            <tr${player.madeCut ? '' : ' class="table-secondary text-muted"'}>
                <td>${player.position}</td>
                <td>${player.name}</td>
                <td class="${getScoreClass(player.score)}">${player.score}</td>
                <td>${player.madeCut ? 'Made Cut' : 'Missed Cut'}</td>
            </tr>
        `;
    });
    
    detailsHTML += `
                        </tbody>
                    </table>
                </div>
                <div class="mt-3">
                    <h5>Scoring Calculation</h5>
                    <ul>
    `;
    
    if (groupsSurvived >= 7) {
        detailsHTML += `
            <li>7+ groups survived, so the best 7 scores are counted</li>
            <li>Top 7 scores: `;
        
        const top7 = playerDetails
            .filter(p => p.madeCut)
            .slice(0, 7);
        
        top7.forEach((player, index) => {
            detailsHTML += `<span class="${getScoreClass(player.score)}">${player.score}</span> (${player.name})`;
            if (index < top7.length - 1) {
                detailsHTML += ', ';
            }
        });
        
        detailsHTML += `</li>`;
    } else {
        detailsHTML += `<li>Fewer than 7 groups survived, so all scores are counted</li>`;
    }
    
    detailsHTML += `
                        <li>Total score: <span class="${getScoreClass(totalScore)}">${totalScore}</span></li>
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    detailsContainer.innerHTML = detailsHTML;
}

// Helper function to get the CSS class based on the score
function getScoreClass(score) {
    if (!score) return '';
    if (score.startsWith('-')) return 'score-under';
    if (score.startsWith('+')) return 'score-over';
    return 'score-even';
}

// Helper function to convert a score string to a number
function parseScoreToNumber(scoreStr) {
    if (!scoreStr) return 0;
    
    if (scoreStr === 'E') return 0;
    if (scoreStr.startsWith('-')) return parseInt(scoreStr.substring(1), 10) * -1;
    if (scoreStr.startsWith('+')) return parseInt(scoreStr.substring(1), 10);
    
    return parseInt(scoreStr, 10) || 0;
}

// Helper function to format a numeric score to a string
function formatScore(score) {
    if (score === 0) return 'E';
    if (score < 0) return `-${Math.abs(score)}`;
    return `+${score}`;
}

// Update timestamp displays
function updateTimestamps() {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
    };
    const formattedDate = now.toLocaleDateString('en-US', options) + ' ET';
    
    const timestampElements = [
        document.getElementById('last-updated'),
        document.getElementById('pool-last-updated')
    ];
    
    timestampElements.forEach(el => {
        if (el) el.textContent = formattedDate;
    });
} 