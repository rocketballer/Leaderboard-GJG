// Masters Tournament mock data
const mastersData = [
    { pos: "1", player: "Scottie Scheffler", toPar: "-10", thru: "F", today: "-4", r1: "69", r2: "67", r3: "69", r4: "69", total: "274", cut: "" },
    { pos: "2", player: "Collin Morikawa", toPar: "-8", thru: "F", today: "-2", r1: "71", r2: "67", r3: "70", r4: "68", total: "276", cut: "" },
    { pos: "T3", player: "Tommy Fleetwood", toPar: "-7", thru: "F", today: "-3", r1: "72", r2: "68", r3: "70", r4: "67", total: "277", cut: "" },
    { pos: "T3", player: "Max Homa", toPar: "-7", thru: "F", today: "-1", r1: "70", r2: "69", r3: "69", r4: "69", total: "277", cut: "" },
    { pos: "T5", player: "Ludvig Åberg", toPar: "-6", thru: "F", today: "E", r1: "67", r2: "70", r3: "70", r4: "71", total: "278", cut: "" },
    { pos: "T5", player: "Bryson DeChambeau", toPar: "-6", thru: "F", today: "-2", r1: "69", r2: "70", r3: "71", r4: "68", total: "278", cut: "" },
    { pos: "T7", player: "Xander Schauffele", toPar: "-5", thru: "F", today: "-2", r1: "70", r2: "71", r3: "69", r4: "69", total: "279", cut: "" },
    { pos: "T7", player: "Patrick Cantlay", toPar: "-5", thru: "F", today: "-3", r1: "72", r2: "70", r3: "70", r4: "67", total: "279", cut: "" },
    { pos: "T9", player: "Hideki Matsuyama", toPar: "-4", thru: "F", today: "+1", r1: "68", r2: "70", r3: "69", r4: "73", total: "280", cut: "" },
    { pos: "T9", player: "Justin Thomas", toPar: "-4", thru: "F", today: "-2", r1: "73", r2: "69", r3: "70", r4: "68", total: "280", cut: "" },
    { pos: "T11", player: "Jon Rahm", toPar: "-3", thru: "F", today: "E", r1: "72", r2: "70", r3: "68", r4: "71", total: "281", cut: "" },
    { pos: "T11", player: "Viktor Hovland", toPar: "-3", thru: "F", today: "-1", r1: "71", r2: "72", r3: "69", r4: "69", total: "281", cut: "" },
    { pos: "T11", player: "Will Zalatoris", toPar: "-3", thru: "F", today: "E", r1: "69", r2: "72", r3: "70", r4: "70", total: "281", cut: "" },
    { pos: "T14", player: "Brooks Koepka", toPar: "-2", thru: "F", today: "+2", r1: "70", r2: "69", r3: "69", r4: "74", total: "282", cut: "" },
    { pos: "T14", player: "Cameron Smith", toPar: "-2", thru: "F", today: "-3", r1: "71", r2: "72", r3: "72", r4: "67", total: "282", cut: "" },
    { pos: "MC", player: "Jordan Spieth", toPar: "+4", thru: "F", today: "+2", r1: "74", r2: "74", r3: "", r4: "", total: "148", cut: "CUT" },
    { pos: "MC", player: "Rory McIlroy", toPar: "+3", thru: "F", today: "+1", r1: "73", r2: "74", r3: "", r4: "", total: "147", cut: "CUT" },
    { pos: "MC", player: "Dustin Johnson", toPar: "+3", thru: "F", today: "+2", r1: "71", r2: "76", r3: "", r4: "", total: "147", cut: "CUT" },
    { pos: "MC", player: "Phil Mickelson", toPar: "+5", thru: "F", today: "+3", r1: "74", r2: "75", r3: "", r4: "", total: "149", cut: "CUT" },
    { pos: "MC", player: "Tiger Woods", toPar: "+6", thru: "F", today: "+3", r1: "75", r2: "75", r3: "", r4: "", total: "150", cut: "CUT" }
];

// Pool participants mock data
const participantsData = [
    {
        name: "John Smith",
        players: [
            "Scottie Scheffler", "Tommy Fleetwood", "Xander Schauffele", 
            "Justin Thomas", "Jon Rahm", "Hideki Matsuyama", "Max Homa", 
            "Ludvig Åberg", "Patrick Cantlay", "Collin Morikawa", 
            "Jordan Spieth", "Rory McIlroy"
        ]
    },
    {
        name: "Jane Doe",
        players: [
            "Collin Morikawa", "Max Homa", "Justin Thomas", 
            "Xander Schauffele", "Tommy Fleetwood", "Jon Rahm", 
            "Ludvig Åberg", "Patrick Cantlay", "Hideki Matsuyama", 
            "Scottie Scheffler", "Jordan Spieth", "Rory McIlroy"
        ]
    },
    {
        name: "Michael Johnson",
        players: [
            "Tommy Fleetwood", "Scottie Scheffler", "Jon Rahm", 
            "Hideki Matsuyama", "Max Homa", "Xander Schauffele", 
            "Justin Thomas", "Ludvig Åberg", "Patrick Cantlay", 
            "Collin Morikawa", "Brooks Koepka", "Viktor Hovland"
        ]
    },
    {
        name: "Sarah Williams",
        players: [
            "Scottie Scheffler", "Collin Morikawa", "Tommy Fleetwood", 
            "Max Homa", "Ludvig Åberg", "Jordan Spieth", "Rory McIlroy", 
            "Xander Schauffele", "Patrick Cantlay", "Hideki Matsuyama", 
            "Justin Thomas", "Jon Rahm"
        ]
    },
    {
        name: "Robert Brown",
        players: [
            "Collin Morikawa", "Jordan Spieth", "Rory McIlroy", 
            "Tommy Fleetwood", "Scottie Scheffler", "Max Homa", 
            "Ludvig Åberg", "Xander Schauffele", "Cameron Smith", 
            "Hideki Matsuyama", "Justin Thomas", "Tiger Woods"
        ]
    }
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
            <td>${player.pos}</td>
            <td>${player.player}</td>
            <td class="${getScoreClass(player.toPar)}">${player.toPar}</td>
            <td>${player.thru}</td>
            <td class="${getScoreClass(player.today)}">${player.today}</td>
            <td>${player.r1}</td>
            <td>${player.r2}</td>
            <td>${player.r3}</td>
            <td>${player.r4}</td>
            <td>${player.total}</td>
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
        const groupsSurvived = countSurvivedGroups(participant.players);
        
        // Determine status
        const status = groupsSurvived >= 7 ? 'Active' : 'Eliminated';
        
        // Calculate total score
        const totalScore = calculateTotalScore(participant.players, groupsSurvived);
        
        return {
            name: participant.name,
            groupsSurvived: groupsSurvived,
            status: status,
            totalScore: totalScore,
            players: participant.players
        };
    });
}

// Count how many of a participant's player groups survived the cut
function countSurvivedGroups(playerList) {
    return playerList.filter(playerName => {
        const playerData = mastersData.find(p => p.player === playerName);
        return playerData && playerData.cut !== "CUT";
    }).length;
}

// Calculate the total score for a participant
function calculateTotalScore(playerList, groupsSurvived) {
    // Get scores for each player
    const playerScores = playerList.map(playerName => {
        const playerData = mastersData.find(p => p.player === playerName);
        if (!playerData) return null;
        return {
            name: playerName,
            score: playerData.toPar,
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
    const playerDetails = participant.players.map(playerName => {
        const playerData = mastersData.find(p => p.player === playerName);
        if (!playerData) return {
            name: playerName,
            score: "N/A",
            madeCut: false,
            pos: "N/A"
        };
        
        return {
            name: playerName,
            score: playerData.toPar,
            madeCut: playerData.cut !== "CUT",
            pos: playerData.pos
        };
    });
    
    // Calculate participant stats
    const groupsSurvived = countSurvivedGroups(participant.players);
    const status = groupsSurvived >= 7 ? 'Active' : 'Eliminated';
    const totalScore = calculateTotalScore(participant.players, groupsSurvived);
    
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
                <td>${player.pos}</td>
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