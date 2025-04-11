// Pool Leaderboard JavaScript

// Function to fetch participant data from JSON file
async function fetchParticipantData() {
    try {
        const response = await fetch('participants-data.json');
        if (!response.ok) {
            throw new Error('Failed to fetch participant data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching participant data:', error);
        return [];
    }
}

// Function to calculate participant scores
function calculateParticipantScores(participants, mastersData) {
    return participants.map(participant => {
        const groupsSurvived = countSurvivedGroups(participant.picks, mastersData);
        const totalScore = calculateTotalScore(participant.picks, mastersData, groupsSurvived);
        
        return {
            name: participant.name,
            totalScore,
            groupsSurvived,
            status: groupsSurvived >= 7 ? 'Active' : 'Eliminated'
        };
    }).sort((a, b) => a.totalScore - b.totalScore);
}

// Function to count how many groups survived the cut
function countSurvivedGroups(playerList, mastersData) {
    let survivedGroups = 0;
    const groups = chunk(playerList, 1); // Split players into groups of 1
    
    groups.forEach(group => {
        const hasSurvivor = group.some(player => {
            const playerData = mastersData.find(p => p.name === player);
            return playerData && playerData.status === 'Active';
        });
        if (hasSurvivor) survivedGroups++;
    });
    
    return survivedGroups;
}

// Function to calculate total score
function calculateTotalScore(playerList, mastersData, groupsSurvived) {
    if (groupsSurvived < 7) return Infinity; // Eliminated participants
    
    const playerScores = playerList.map(player => {
        const playerData = mastersData.find(p => p.name === player);
        return playerData ? playerData.score : Infinity;
    });
    
    // Sort scores and take the best 7
    return playerScores
        .sort((a, b) => a - b)
        .slice(0, 7)
        .reduce((sum, score) => sum + score, 0);
}

// Helper function to chunk array into groups
function chunk(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}

// Function to update the leaderboard display
function updatePoolLeaderboardDisplay(participants) {
    const tbody = document.querySelector('#pool-leaderboard tbody');
    tbody.innerHTML = '';
    
    participants.forEach((participant, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><a href="#" class="participant-link" data-participant="${participant.name}">${participant.name}</a></td>
            <td class="${getScoreClass(participant.totalScore)}">${participant.totalScore === Infinity ? 'Eliminated' : participant.totalScore}</td>
            <td>${participant.groupsSurvived}/12</td>
            <td><span class="status-${participant.status.toLowerCase()}">${participant.status}</span></td>
        `;
        tbody.appendChild(row);
    });
    
    // Add click handlers for participant links
    document.querySelectorAll('.participant-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const participantName = e.target.dataset.participant;
            const participant = participants.find(p => p.name === participantName);
            if (participant) {
                showParticipantDetails(participant);
            }
        });
    });
}

// Function to show participant details in modal
function showParticipantDetails(participant) {
    const modalBody = document.getElementById('participantModalBody');
    modalBody.innerHTML = `
        <h4>${participant.name}</h4>
        <p>Total Score: ${participant.totalScore === Infinity ? 'Eliminated' : participant.totalScore}</p>
        <p>Groups Survived: ${participant.groupsSurvived}/12</p>
        <p>Status: <span class="status-${participant.status.toLowerCase()}">${participant.status}</span></p>
        
        <h5 class="mt-4">Player Picks</h5>
        <div class="table-responsive">
            <table class="table table-sm">
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Score</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${participant.picks.map(player => {
                        const playerData = mastersData.find(p => p.name === player);
                        return `
                            <tr>
                                <td>${player}</td>
                                <td>${playerData ? playerData.score : 'N/A'}</td>
                                <td>${playerData ? playerData.status : 'N/A'}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    const modal = new bootstrap.Modal(document.getElementById('participantModal'));
    modal.show();
}

// Function to get CSS class based on score
function getScoreClass(score) {
    if (score === Infinity) return 'text-danger';
    if (score <= 0) return 'text-success';
    return '';
}

// Function to update the last updated timestamp
function updateLastUpdated() {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short'
    };
    document.getElementById('pool-last-updated').textContent = now.toLocaleString('en-US', options);
}

// Main function to update the leaderboard
async function updatePoolLeaderboard() {
    try {
        const participants = await fetchParticipantData();
        const scoredParticipants = calculateParticipantScores(participants, mastersData);
        updatePoolLeaderboardDisplay(scoredParticipants);
        updateLastUpdated();
    } catch (error) {
        console.error('Error updating leaderboard:', error);
    }
}

// Event listener for refresh button
document.getElementById('pool-refresh-btn').addEventListener('click', updatePoolLeaderboard);

// Initial load and periodic updates
updatePoolLeaderboard();
setInterval(updatePoolLeaderboard, 5 * 60 * 1000); // Update every 5 minutes 