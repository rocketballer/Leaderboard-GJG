import pandas as pd
import json

def excel_to_json(excel_file, sheet_name, output_file):
    # Read the Excel file
    df = pd.read_excel(excel_file, sheet_name=sheet_name)
    
    # Convert DataFrame to list of dictionaries
    participants = []
    
    # Iterate through each row
    for _, row in df.iterrows():
        # Get participant name
        name = row['Name']
        
        # Get picks (assuming they are in columns named 'Pick 1', 'Pick 2', etc.)
        picks = []
        for i in range(1, 13):  # 12 picks
            pick_col = f'Pick {i}'
            if pick_col in row and pd.notna(row[pick_col]):
                picks.append(row[pick_col])
        
        # Add participant to list
        participants.append({
            'name': name,
            'picks': picks
        })
    
    # Write to JSON file
    with open(output_file, 'w') as f:
        json.dump(participants, f, indent=2)
    
    print(f"Successfully converted {excel_file} to {output_file}")

if __name__ == "__main__":
    excel_file = "GJG_Masters_Tournament.xlsx"
    sheet_name = "Participants Leaderboard"
    output_file = "participants-data.json"
    
    excel_to_json(excel_file, sheet_name, output_file) 