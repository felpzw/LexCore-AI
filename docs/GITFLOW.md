# Git workflow

## Branch model

The repository uses `develop` to integrate ongoing work and `master` for releases. GitHub's default branch is currently `master`, so explicitly select `develop` as the base for regular pull requests.

| Branch | Purpose | Base and pull-request target |
| --- | --- | --- |
| `master` | Released project changes | Release and hotfix pull requests |
| `develop` | Integration of ongoing work | Regular pull-request target |
| `feature/<description>` | New capabilities | `develop` |
| `fix/<description>` | Bug fixes | `develop` |
| `docs/<description>` | Documentation changes | `develop` |
| `refactor/<description>` | Internal restructuring | `develop` |
| `release/<version>` | Optional release preparation | From `develop` into `master`; synchronize fixes back to `develop` |
| `hotfix/<description>` | Urgent corrections | `master` |

These are contributor conventions. This guide does not imply that remote branch protection or CI checks have been configured.

## Daily workflow

1. Start with a clean working tree; preserve existing work before switching branches.
2. Update `develop` and create a focused branch:

   ```bash
   git switch develop
   git pull --ff-only origin develop
   git switch -c docs/describe-your-change
   ```

3. Make one coherent change at a time and update the relevant documentation.
4. Review `git diff` and `git diff --check`, then stage specific paths. Inspect `git diff --cached` before committing.
5. Follow the [commit standards](COMMIT_STANDARDS.md).
6. Push the current branch and open a pull request targeting `develop`:

   ```bash
   git push -u origin HEAD
   ```

   On GitHub, select **base: `develop`** and **compare: your working branch**. With GitHub CLI, use `gh pr create --base develop`.

Pushing publishes the branch; it does not merge it. Merge the reviewed pull request into `develop` separately. Do not push a working branch directly over `develop` to bypass review.

If the base branch changes, fetch `origin` and merge `origin/develop` into a shared branch. Rebase only when it will not rewrite history used by collaborators.

## Publishing the repository documentation branch

The repository metadata work uses `docs/github-info`, derived from `develop`. After its changes are committed, publish it with:

```bash
git push -u origin docs/github-info
```

Then [open a pull request from `docs/github-info` into `develop`](https://github.com/felpzw/LexCore-AI/compare/develop...docs/github-info?expand=1). Review and merge it on GitHub. A push does not update GitHub's About settings; see [repository identity and About](REPOSITORY.md).

## Pull requests

Describe the problem, resulting behavior, and validation performed. Include screenshots for visible interface changes and setup notes for environment or schema changes.

For documentation changes, verify relative links, commands, configuration names, and consistency with the implementation. For application changes, run the relevant build and behavior checks in the configured development environment. Report checks that were skipped and why; do not claim CI or CodeQL results without running them.

Keep the commit stack readable. Preserve meaningful commits, or squash small fixups during review according to the maintainer's merge preference.

## Releases and hotfixes

Create a release branch from `develop` only when a release needs a separate stabilization period. Include the intended version, changes, and validation in its pull request to `master`. Otherwise, open a release pull request directly from `develop` into `master`. After integration, a maintainer can tag the reviewed release commit using `v<major>.<minor>.<patch>`. Merge release fixes back into `develop`.

Create urgent fixes from `master`, validate the affected behavior, and open a focused pull request back to `master`. Carry the fix into `develop` and any active release branch as well.
