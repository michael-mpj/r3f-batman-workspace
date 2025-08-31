# Checklist for Collaboration

This checklist aims to enhance collaboration among team members and across teams, leveraging GitHub’s tools and features.

## Effective Communication

- Does the team encourage open communication and early-stage collaboration?
- Are there established channels for proactive engagement and feedback?
- Ensure pull requests are used effectively for code collaboration and review.
- Is there a formalized code review process in place?
- Are conversation tools integrated seamlessly with the development workflow?
- Are discussions linked directly to the codebase to reduce context-switching?
- Check for integrations with external communication tools like Slack or Microsoft Teams.
- Are GitHub Enterprise-specific communication tools and features being utilized effectively?
- Verify that code follows best practices and coding standards.
- Ensure that code is well-documented.

## Inclusivity

- Is there an onboarding process that incorporates key tooling concepts for new team members?
- Are new team members trained to understand existing processes, workflows, and practices?
- Does the team foster a culture of learning and mentoring?
- Are there initiatives to ensure that diverse perspectives are included in decision-making?
- Are GitHub Enterprise-specific onboarding and training materials provided to new team members?

## Openness

- Are there virtual spaces for exchanging ideas, posing questions, and deliberating issues?
- Are there processes for communicating security findings throughout the project lifecycle?
- Is there a comprehensive knowledge repository for documentation and guidelines?
- Evaluate the use of GitHub Discussions or other tools for team communication.
- Review access controls to ensure appropriate permissions for collaborators.
- Are GitHub Enterprise-specific features like internal repositories and wikis being used to promote openness?

## Transparency

- Are there standardized processes for communicating security findings?
- Are all team members informed about the project’s progress in real-time?
- Are there automated workflows that trigger notifications and updates across different teams?
- Are GitHub Projects or other project management tools used to provide visibility into project status?
- Are GitHub Enterprise-specific audit logs and monitoring tools used to ensure transparency?

## Flexibility

- Does the team model facilitate a culture of open dialogue and collective ownership?
- Are there automated workflows to boost productivity and maintain high-quality standards?
- Are standard project management methodologies adopted to streamline the code delivery process?
- Is there integration with third-party tools to enhance functionality and productivity?
- Are GitHub Enterprise-specific customization options and integrations being leveraged to enhance flexibility to various team needs?

## Setup Instructions

To set up SSH for secure collaboration:

```bash
# generate an SSH key (if you don't have one)
ssh-keygen -t ed25519 -C "<you@example.com>" -f ~/.ssh/id_ed25519 -N ""

# start ssh-agent and add the key (macOS)
eval "$(ssh-agent -s)"
ssh-add --apple-use-keychain ~/.ssh/id_ed25519

# copy public key to clipboard, then add to GitHub > Settings > SSH and GPG keys
pbcopy < ~/.ssh/id_ed25519.pub

# set the repo remote to SSH (run from repo root)
git remote set-url origin <git@github.com>:your-username/your-repo.git

# make scaffold script executable and run it with bash (avoid pasting shebang lines into zsh)
chmod +x .github/scaffold_github_files.sh
bash .github/scaffold_github_files.sh
```
