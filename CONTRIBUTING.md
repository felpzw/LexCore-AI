# Contributing to LexCore AI

Use the [canonical repository](https://github.com/felpzw/LexCore-AI) for issues and pull requests.

## Prepare a change

1. Follow the [setup and environment guide](docs/SETUP_AND_ENVIRONMENT.md).
2. Create a focused branch from an up-to-date `develop`, following the [Git workflow](docs/GITFLOW.md).
3. Make the change and update the relevant documentation. Write documentation, commit messages, issues, and pull requests in English. Preserve actual Portuguese interface labels and code identifiers when referring to the existing application.
4. Review the diff and run checks appropriate to the change. For documentation, verify links, commands, and consistency with the implementation. For application changes, validate the affected behavior in the development environment.
5. Commit using the [commit standards](docs/COMMIT_STANDARDS.md), push your branch, and open a pull request with `develop` as its base.

If you do not have write access, fork the repository and open a pull request from your fork into this repository's `develop` branch.

Describe the problem, what changed, and the checks actually performed. Include screenshots for visible interface changes. Keep unrelated changes in separate pull requests.

## Report a bug or propose a feature

Search the [existing issues](https://github.com/felpzw/LexCore-AI/issues) before opening a new one. For bugs, provide reproduction steps, expected and actual behavior, and relevant environment versions. Use synthetic records and remove credentials and private client or case data from examples and logs.

For feature proposals, explain the use case and expected behavior. The [project overview](docs/PROJECT_OVERVIEW.md) describes what is currently implemented.

## License

Contributions are distributed under the project's [MIT license](LICENSE). Preserve applicable copyright and license notices when including third-party material.
