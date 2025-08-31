# Branch Protection Rules Configuration

This document outlines the recommended branch protection rules for the R3F Batman Workspace repository.

## Recommended Branch Protection Rules for `main`

### 1. **Require Pull Request Reviews**
- Require at least 1 review before merging
- Dismiss stale reviews when new commits are pushed
- Require review from code owners (when CODEOWNERS file is present)

### 2. **Require Status Checks**
- Require branches to be up to date before merging
- Required status checks:
  - `ci/lint` - ESLint checks
  - `ci/test` - Unit tests
  - `ci/build` - Build verification

### 3. **Require Conversation Resolution**
- Require all conversations to be resolved before merging

### 4. **Require Linear History**
- Enforce linear history to keep git log clean

### 5. **Restrictions**
- Include administrators in restrictions
- Allow force pushes: **No**
- Allow deletions: **No**

## GitHub Actions Required

The branch rules reference these GitHub Actions workflows:
- `.github/workflows/ci.yml` - Continuous Integration
- `.github/workflows/build.yml` - Build verification

## Setup Instructions

1. Go to https://github.com/michael-mpj/r3f-batman-workspace/settings/rules
2. Click "New ruleset"
3. Configure using the settings above
4. Apply to `main` branch
