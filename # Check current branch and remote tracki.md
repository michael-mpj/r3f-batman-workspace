# Check current branch and remote tracking

git branch -vv

# Check for any uncommitted changes

git diff --name-only

# Check for staged changes

git diff --staged --name-only

# Check for untracked files

git ls-files --others --exclude-standard
