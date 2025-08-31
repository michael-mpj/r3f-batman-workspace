# Branch Protection Setup for R3F Batman Workspace

This repository includes automated branch protection rules to maintain code quality and secure the main branch.

## 🛡️ Protection Rules Applied

### Main Branch (`main`)

- ✅ **Pull Request Reviews**: Require at least 1 review before merging
- ✅ **Status Checks**: All CI checks must pass (lint, test, build)
- ✅ **Linear History**: Enforce clean git history
- ✅ **Conversation Resolution**: All PR conversations must be resolved
- ❌ **Force Pushes**: Disabled to protect history
- ❌ **Branch Deletion**: Disabled to prevent accidental removal

## 🚀 Quick Setup

### Option 1: Automated Setup (Recommended)

If you have GitHub CLI installed:

```bash
# Run the setup script
./scripts/setup-branch-protection.sh
```

### Option 2: Manual Setup

1. Go to [Repository Settings > Rules](https://github.com/michael-mpj/r3f-batman-workspace/settings/rules)
2. Click "New ruleset"
3. Configure using the settings below:

**Ruleset Configuration:**

- **Name**: "Main Branch Protection"
- **Target**: Branch
- **Branch Pattern**: `main`
- **Enforcement**: Active

**Rules to Enable:**

- Pull requests
  - Require 1 review
  - Dismiss stale reviews
  - Require code owner review (when CODEOWNERS exists)
  - Require conversation resolution
- Status checks
  - Require up-to-date branches
  - Required checks: `lint`, `test`, `build`
- Restrict pushes
  - Restrict force pushes
- Restrict deletions
- Require linear history

## 📋 Required Status Checks

The branch protection relies on these GitHub Actions:

| Check   | Workflow                   | Description                |
| ------- | -------------------------- | -------------------------- |
| `lint`  | `.github/workflows/ci.yml` | ESLint code quality checks |
| `test`  | `.github/workflows/ci.yml` | Unit test execution        |
| `build` | `.github/workflows/ci.yml` | Build verification         |

## 🔄 Workflow Integration

Branch protection works with your existing development workflow:

1. **Feature Development**: Create feature branches from `main`
2. **Quality Checks**: Husky pre-commit hooks run locally
3. **Pull Request**: Create PR to merge into `main`
4. **CI Pipeline**: GitHub Actions run automatically
5. **Code Review**: Team reviews are required
6. **Merge**: Only possible when all checks pass

## 🛠️ Troubleshooting

### Status Checks Failing

If required status checks are failing:

```bash
# Run checks locally first
npm run lint
npm run test
npm run build

# Fix any issues, then commit
git add .
git commit -m "fix: resolve linting/test issues"
git push
```

### Need to Push Emergency Fix

In rare cases where you need to bypass protection:

1. Go to Settings > Rules
2. Temporarily disable the ruleset
3. Make your changes
4. Re-enable the ruleset immediately

**⚠️ Warning**: Only use bypass for genuine emergencies.

## 📚 Additional Resources

- [GitHub Branch Protection Rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets)
- [GitHub CLI Documentation](https://cli.github.com/manual/)
- [Repository Contributing Guidelines](../.github/CONTRIBUTING.md)

---

🦇 **Batman says**: "A protected branch is a secure branch. Keep Gotham's code safe!" 🌃
