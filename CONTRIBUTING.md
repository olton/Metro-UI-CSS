## Issues Guidelines
Before create issue:
- check for existing issues
- create pen on codepen.io with your problem
- describe the problem in detail


## Pull Request Guidelines

- The `master` branch is basically just a snapshot of the latest stable release. All development should be done in dedicated branches. **Do not submit PRs against the `master` branch.**

- Check that you are using the latest version of the library.

- The patch must contains only files in source folders: `less` and `js`

- To work on something patch, create a descriptively named branch off of master.

- If fixing a bug:
  - If you are resolving a special issue, add `(fix #xxxx[,#xxx])` (#xxxx is the issue id) in your PR title for a better release log, e.g. `update entities encoding/decoding (fix #3899)`.
  - Provide detailed description of the bug in the PR. Live demo preferred.
  - Add appropriate test coverage if applicable.