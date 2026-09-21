# Git workflow

## Branch model

The repository currently uses `master` as its default branch. Use the following lightweight GitFlow-style convention; a persistent `develop` branch is not currently required.

| Branch | Purpose | Base and pull-request target |
| --- | --- | --- |
| `master` | Integrated project changes | Default branch |
| `feature/<description>` | New capabilities | `master` |
| `fix/<description>` | Bug fixes | `master` |
| `docs/<description>` | Documentation changes | `master` |
| `refactor/<description>` | Internal restructuring | `master` |
| `release/<version>` | Optional release preparation | `master` |
| `hotfix/<description>` | Urgent corrections | `master` |

These are contributor conventions. This guide does not imply that remote branch protection or CI checks have been configured.

## Daily workflow

1. Start with a clean working tree; preserve existing work before switching branches.
2. Update the default branch and create a focused branch:

   ```bash
   git switch master
   git pull --ff-only origin master
   git switch -c docs/lexcore-ai-documentation
   ```

3. Make one coherent change at a time and update the relevant documentation.
4. Review `git diff` and `git diff --check`, then stage specific paths. Inspect `git diff --cached` before committing.
5. Follow the [commit standards](COMMIT_STANDARDS.md).
6. Push the branch and open a pull request targeting `master`:

   ```bash
   git push -u origin docs/lexcore-ai-documentation
   ```

If the base branch changes, merge `origin/master` into a shared branch. Rebase only when it will not rewrite history used by collaborators.

## Pull requests

Describe the problem, resulting behavior, and validation performed. Include screenshots for visible interface changes and setup notes for environment or schema changes.

For documentation changes, verify relative links, commands, configuration names, and consistency with the implementation. For application changes, run the relevant build and behavior checks in the configured development environment. Report checks that were skipped and why; do not claim CI or CodeQL results without running them.

Keep the commit stack readable. Preserve meaningful commits, or squash small fixups during review according to the maintainer's merge preference.

## Releases and hotfixes

Create a release branch only when a release needs a separate stabilization period. Include the intended version, changes, and validation in its pull request. After integration, a maintainer can tag the reviewed release commit using `v<major>.<minor>.<patch>`.

Create urgent fixes from `master`, validate the affected behavior, and open a focused pull request back to `master`. If a release branch is active, carry the relevant fix into it as well.
