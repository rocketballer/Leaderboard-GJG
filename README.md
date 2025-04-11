# Slates GJG - Masters Tournament Pool Tracker

A web-based application for tracking the Masters Tournament and a custom pool with specific survival and scoring rules.

## Features

- **Masters Leaderboard Page**
  - Replicates the CBS Sports Masters tournament leaderboard
  - Displays player positions, scores, round details, and cut status
  - Color-coded scores (red for over par, green for under par)
  - Responsive design for all devices

- **Pool Leaderboard Page**
  - Tracks pool participants based on their 12 player group selections
  - Calculates survival status (eliminated if fewer than 7 player groups survive the cut)
  - Implements custom scoring: sum of best 7 scores for active participants
  - Displays detailed breakdowns of each participant's selections and scores

## How It Works

### Masters Tournament Data

The application maintains a list of players with their current tournament data:
- Position (e.g., T1, 2, MC)
- Player name
- Score to par (e.g., -5, E, +3)
- Current round progress (e.g., F, 15)
- Current round score (e.g., -3, E, +2)
- Individual round scores (R1-R4)
- Total aggregate score
- Cut status

Players who miss the cut are displayed with strikethrough text and "MC" in the position column.

### Participant Scoring System

The application implements the specific pool rules:

1. **Survival Mechanics:**
   - After Round 2 (the cut), the system counts how many of each participant's 12 player groups have at least 1 player who made the cut
   - If fewer than 7 groups survive, the participant is marked as "Eliminated"

2. **Scoring Calculation:**
   - For participants with 7+ surviving groups: Sum the best 7 scores to par from their surviving players
   - For all participants: Include all surviving players' scores + missed-cut players' final scores
   - The participant with the lowest total score (best to par) wins

3. **Interactive Details:**
   - Click on any participant's name to view their player selections and detailed scoring breakdown
   - See which players made the cut and how their scores contribute to the total

## Technical Implementation

- Pure HTML, CSS, and vanilla JavaScript
- Bootstrap 5 for responsive design
- No backend required - data is updated in the JavaScript file
- Mobile-friendly interface

## Setup Instructions

1. Clone this repository
2. Open the index.html file in your web browser
3. To update tournament data:
   - Edit the `mastersData` array in scripts.js
   - Update player scores, positions, and cut status as the tournament progresses

## Customization

- To add or modify participants and their player selections:
  - Edit the `participantsData` array in scripts.js
  - Each participant needs a name and an array of 12 player names

## Hosting

This is a static website that can be hosted on any web server or platform that supports static files:
- GitHub Pages
- Netlify 
- Vercel
- Any standard web hosting service

## License

This project is available for use under the MIT License. 