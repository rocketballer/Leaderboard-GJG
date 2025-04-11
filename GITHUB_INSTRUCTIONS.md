# GitHub Upload Instructions

Follow these steps to upload this project to GitHub at https://github.com/rocketballer/SlatesGJG:

## One-Time Setup

1. Ensure you have Git credentials configured:
   ```
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

2. Connect to the GitHub repository:
   ```
   git remote add origin https://github.com/rocketballer/SlatesGJG.git
   ```

## Pushing Changes

1. Push your changes to GitHub:
   ```
   git push -u origin master
   ```

2. If this is your first push, you may be prompted to authenticate with GitHub.

## Updating the Repository Later

When you make future changes to the Excel file or code:

1. Add the changed files:
   ```
   git add GJG_Masters_Tournament.xlsx create_masters_tournament.py
   ```

2. Commit your changes:
   ```
   git commit -m "Update with latest tournament data"
   ```

3. Push to GitHub:
   ```
   git push
   ```

## Troubleshooting

If you get an error when pushing:

1. Pull the latest changes first:
   ```
   git pull origin master
   ```

2. Resolve any conflicts if needed, then commit and push again.

## GitHub Repository Management

1. **Repository Settings**: Visit https://github.com/rocketballer/SlatesGJG/settings
2. **Collaborators**: Add collaborators at https://github.com/rocketballer/SlatesGJG/settings/access
3. **Issues**: Track issues at https://github.com/rocketballer/SlatesGJG/issues 