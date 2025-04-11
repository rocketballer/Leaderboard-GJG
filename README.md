# Slates GJG Masters Tournament Pool Tracker

This Excel workbook is designed to manage a Masters Tournament pool with specific survival and scoring rules.

## Features

- **Tab 1: CBS Sports-Style Leaderboard**
  - Replicates the CBS Sports Masters leaderboard with position, scores, round details, and cut line indicators
  - Automatically color-codes scores (red for over par, green for under par)
  - Full tournament view with individual round scores and totals

- **Tab 2: Participants Leaderboard**
  - Tracks pool participants based on their 12 player group selections
  - Calculates survival status (eliminated if fewer than 7 player groups survive the cut)
  - Implements custom scoring: sum of best 7 scores for active participants
  - Auto-ranks participants by their total scores

## How to Use

### Tournament Data (Tab 1)

1. Enter or update player data in Tab 1 ("CBS Leaderboard")
2. For each player, enter:
   - Position (e.g., T1, 2, MC)
   - Player name
   - Score to par (e.g., -5, E, +3)
   - Current round progress (e.g., F, 15)
   - Current round score (e.g., -3, E, +2)
   - Individual round scores (R1-R4)
   - Total aggregate score
3. For players who miss the cut, enter "CUT" in the CUT column and "MC" in the POS column

### Participant Data (Tab 2)

1. Enter each participant's name in the PARTICIPANT column
2. Enter their 12 player group selections in the PLAYER GROUP columns
3. The workbook will automatically calculate:
   - GROUPS SURVIVED: Count of players who made the cut
   - STATUS: "Active" if 7+ groups survived, otherwise "Eliminated"
   - TOTAL SCORE: Sum of best 7 scores for active participants
   - RANK: Automatic ranking based on total scores

## Implementation Details

### Required Formulas

The workbook contains instructions for implementing the following key formulas:

1. **GROUPS SURVIVED Formula (Column D)**:
   ```
   =COUNTIFS('CBS Leaderboard'!B:B,F2,'CBS Leaderboard'!K:K,"<>CUT") + 
    COUNTIFS('CBS Leaderboard'!B:B,G2,'CBS Leaderboard'!K:K,"<>CUT") + ...
   ```
   (Repeat for all player groups)

2. **STATUS Formula (Column E)**:
   ```
   =IF(D2>=7,"Active","Eliminated")
   ```

3. **TOTAL SCORE Formula (Column C)**:
   ```
   =IF(D2>=7,
       SUM(SMALL(IF(COUNTIF('CBS Leaderboard'!B:B,{F2,G2,...,Q2})>0,
           VLOOKUP({F2,G2,...,Q2},'CBS Leaderboard'!B:C,2,FALSE)),{1,2,3,4,5,6,7})),
       SUM(IF(COUNTIF('CBS Leaderboard'!B:B,{F2,G2,...,Q2})>0,
           VLOOKUP({F2,G2,...,Q2},'CBS Leaderboard'!B:C,2,FALSE)))
   )
   ```

4. **RANK Formula (Column A)**:
   ```
   =RANK.EQ(C2,$C$2:$C$100)
   ```

## Scoring Rules

1. Each participant selects 12 player groups
2. After Round 2 (the cut):
   - Count how many player groups have at least 1 player who made the cut
   - If fewer than 7 groups survive, participant is eliminated
3. Final scoring:
   - If 7+ groups survived: Sum the best 7 scores from surviving players
   - If fewer than 12 groups survived: Include all surviving players' scores + missed-cut players' final scores

## Notes

- This workbook uses Excel formulas to automate all calculations
- Some formulas may require modifications based on your specific sheet layout
- In newer Excel versions, array formulas are automatically calculated
- In older Excel versions, you may need to use Ctrl+Shift+Enter for array formulas

## License

This project is available for use under the [MIT License](LICENSE). 