// Function to get CSS class based on score
function getScoreClass(score) {
    if (typeof score === 'string') {
        if (score.startsWith('-')) return 'text-success';
        if (score.startsWith('+')) return 'text-danger';
        if (score === 'E') return '';
    }
    return '';
}

// Function to update the leaderboard display
function updateLeaderboardDisplay() {
    console.log('Updating leaderboard display...');
    const tableBody = document.querySelector('#masters-leaderboard tbody');
    if (!tableBody) {
        console.error('Could not find table body element');
        return;
    }
    
    tableBody.innerHTML = '';
    
    if (!mastersData || mastersData.length === 0) {
        console.error('No data available to display');
        return;
    }
    
    console.log('Displaying data:', mastersData);
    
    mastersData.forEach(player => {
        const row = document.createElement('tr');
        
        // If player missed the cut, add the missed-cut class
        if (player.cut) {
            row.classList.add('missed-cut');
        }
        
        row.innerHTML = `
            <td>${player.position}</td>
            <td>${player.name}</td>
            <td class="${getScoreClass(player.scoreToPar)}">${player.scoreToPar}</td>
            <td>${player.thru || '-'}</td>
            <td>${player.today || '-'}</td>
            <td>${player.round1 || '-'}</td>
            <td>${player.round2 || '-'}</td>
            <td>${player.round3 || '-'}</td>
            <td>${player.round4 || '-'}</td>
            <td>${player.total || '-'}</td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Update the last updated timestamp
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short'
    };
    document.getElementById('last-updated').textContent = now.toLocaleString('en-US', options);
}

// Function to refresh the leaderboard
async function refreshLeaderboard() {
    console.log('Refreshing leaderboard...');
    try {
        const data = await updateLeaderboardData();
        console.log('Got updated data:', data);
        updateLeaderboardDisplay();
    } catch (error) {
        console.error('Error refreshing leaderboard:', error);
    }
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing leaderboard...');
    
    // Add event listener for the refresh button
    const refreshBtn = document.getElementById('refresh-btn');
    if (refreshBtn) {
        console.log('Adding refresh button listener');
        refreshBtn.addEventListener('click', refreshLeaderboard);
    } else {
        console.error('Could not find refresh button');
    }

    // Initial load
    console.log('Starting initial load');
    refreshLeaderboard();
    
    // Set up periodic updates
    console.log('Setting up periodic updates');
    setInterval(refreshLeaderboard, 5 * 60 * 1000); // Update every 5 minutes
}); 