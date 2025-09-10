# React 19 Compatibility Reference

| Package                | Workspace Version | App Version  | Latest Compatible for React 19 | Notes                               |
|------------------------|-------------------|--------------|-------------------------------|-------------------------------------|
| react                  | 19.0.0            | 19.0.0       | 19.0.0                        | Fully compatible                    |
| @react-three/fiber     | ^9.3.0            | ^9.3.0       | ^9.3.x                        | v9+ required for React 19           |
| @react-three/drei      | ^9.122.0          | ^10.7.4      | ^10.x                         | Use v10+ for R3F v9/React 19        |

> **Guidelines:**
> - Ensure all workspace and app packages use matching major versions for React, @react-three/fiber, and @react-three/drei.
> - Avoid Node version matrices; use a single, current Node version (e.g., Node 22).
> - Always check package release notes for breaking changes before upgrading.
> - Use the script `update-packages.sh` to easily update all dependencies.

## Usage

- When upgrading, update both workspace root and all apps.
- If you add new packages, verify their compatibility with React 19.

## Update Script Reference

See [`update-packages.sh`](./update-packages.sh) for a quick way to update all packages to the latest compatible versions.