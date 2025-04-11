[1mdiff --git a/masters-data.js b/masters-data.js[m
[1mindex b3e99f3..b5a4898 100644[m
[1m--- a/masters-data.js[m
[1m+++ b/masters-data.js[m
[36m@@ -30,35 +30,19 @@[m [masync function fetchLeaderboardData() {[m
         console.log('API Response structure:', JSON.stringify(data, null, 2));[m
 [m
         // Check if we have the expected data structure[m
[31m-        if (!data || !data.leaderboard) {[m
[32m+[m[32m        if (!data || !data.results || !data.results.leaderboard) {[m
             console.error('Invalid API response format:', data);[m
[31m-            // Try to find the leaderboard data in a different location[m
[31m-            if (data.results && data.results.leaderboard) {[m
[31m-                console.log('Found leaderboard data in data.results.leaderboard');[m
[31m-                return transformLeaderboardData(data.results.leaderboard);[m
[31m-            } else if (Array.isArray(data)) {[m
[31m-                console.log('Data is directly an array of players');[m
[31m-                return transformLeaderboardData(data);[m
[31m-            }[m
             return [];[m
         }[m
 [m
         // Transform the leaderboard data[m
[31m-        const transformedData = transformLeaderboardData(data.leaderboard);[m
[32m+[m[32m        const transformedData = transformLeaderboardData(data.results.leaderboard);[m
         console.log('Transformed data:', transformedData);[m
         [m
         return transformedData;[m
     } catch (error) {[m
         console.error('Error fetching leaderboard data:', error);[m
[31m-        // Return mock data for testing[m
[31m-        console.log('Using mock data instead');[m
[31m-        return {[m
[31m-            leaderboard: [[m
[31m-                { position: "1", player_name: "Justin Rose", total_to_par: "-8", round1_score: 68, round2_score: 68, status: "ACTIVE" },[m
[31m-                { position: "2", player_name: "Bryson DeChambeau", total_to_par: "-7", round1_score: 71, round2_score: 68, status: "ACTIVE" },[m
[31m-                { position: "T3", player_name: "Scottie Scheffler", total_to_par: "-4", round1_score: 72, round2_score: 70, status: "ACTIVE" }[m
[31m-            ][m
[31m-        };[m
[32m+[m[32m        return [];[m
     }[m
 }[m
 [m
[36m@@ -73,8 +57,8 @@[m [mfunction transformLeaderboardData(data) {[m
     }[m
 [m
     return data.map(player => {[m
[31m-        // Log the player object to see its structure[m
[31m-        console.log('Processing player:', player);[m
[32m+[m[32m        // Log the complete player object for debugging[m
[32m+[m[32m        console.log('Processing player:', JSON.stringify(player, null, 2));[m
         [m
         // Extract player data from the API response format[m
         const firstName = player.first_name || 'Unknown';[m
[36m@@ -86,15 +70,30 @@[m [mfunction transformLeaderboardData(data) {[m
         [m
         // Get round scores from the rounds array[m
         const rounds = player.rounds || [];[m
[31m-        const round1 = rounds.find(r => r.round_number === 1)?.total_to_par || 'E';[m
[31m-        const round2 = rounds.find(r => r.round_number === 2)?.total_to_par || 'E';[m
[31m-        const round3 = rounds.find(r => r.round_number === 3)?.total_to_par || 'E';[m
[31m-        const round4 = rounds.find(r => r.round_number === 4)?.total_to_par || 'E';[m
[32m+[m[32m        console.log('Player rounds:', rounds);[m
[32m+[m[41m        [m
[32m+[m[32m        // Extract round scores with proper error handling[m
[32m+[m[32m        let round1 = 'E';[m
[32m+[m[32m        let round2 = 'E';[m
[32m+[m[32m        let round3 = 'E';[m
[32m+[m[32m        let round4 = 'E';[m
[32m+[m[41m        [m
[32m+[m[32m        if (Array.isArray(rounds)) {[m
[32m+[m[32m            rounds.forEach(round => {[m
[32m+[m[32m                const score = round.total_to_par;[m
[32m+[m[32m                switch(round.round_number) {[m
[32m+[m[32m                    case 1: round1 = score; break;[m
[32m+[m[32m                    case 2: round2 = score; break;[m
[32m+[m[32m                    case 3: round3 = score; break;[m
[32m+[m[32m                    case 4: round4 = score; break;[m
[32m+[m[32m                }[m
[32m+[m[32m            });[m
[32m+[m[32m        }[m
         [m
         // Calculate today's score (round 4)[m
         const today = round4;[m
 [m
[31m-        return {[m
[32m+[m[32m        const transformedPlayer = {[m
             position,[m
             name: `${firstName} ${lastName}`,[m
             total,[m
[36m@@ -106,6 +105,9 @@[m [mfunction transformLeaderboardData(data) {[m
             round4,[m
             status[m
         };[m
[32m+[m[41m        [m
[32m+[m[32m        console.log('Transformed player:', transformedPlayer);[m
[32m+[m[32m        return transformedPlayer;[m
     });[m
 }[m
 [m
