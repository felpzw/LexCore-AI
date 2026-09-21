# Commit standards

## Format

Write commit messages in English using this format:

```text
type(optional-scope): concise imperative description

Optional body explaining why the change is needed and any relevant tradeoffs.

Optional footer for issue references or breaking changes.
```

Use an imperative verb such as `add`, `fix`, or `document`. Keep the subject focused, omit its final period, and aim for no more than 72 characters.

## Types

| Type | Use |
| --- | --- |
| `feat` | Add user-facing functionality |
| `fix` | Correct faulty behavior |
| `docs` | Change documentation |
| `refactor` | Restructure code without changing behavior |
| `perf` | Improve performance |
| `test` | Add or correct tests |
| `build` | Change dependencies or build configuration |
| `ci` | Change automated integration workflows |
| `style` | Change formatting without changing behavior |
| `chore` | Perform other repository maintenance |
| `revert` | Revert an earlier change |

Use a scope when it clarifies the affected area, such as `clients`, `cases`, `documents`, `reports`, `ai`, `db`, or `setup`.

## Examples

```text
feat(documents): add PDF download support
fix(ai): handle missing document content
docs(setup): explain database initialization
refactor(reports): extract shared query helpers
build: update the Tuono dependencies
```

For a breaking change, add `!` after the type or scope and explain the impact and migration in a `BREAKING CHANGE:` footer:

```text
feat(api)!: require document IDs for AI requests

BREAKING CHANGE: AI requests now require document_id instead of file_name.
Update API clients to send the stored document ID.
```

This is a message example, not a description of the current API.

## Commit organization

Keep each commit coherent and independently reviewable. Separate unrelated fixes, generated artifacts, and formatting changes. Do not include private environment values, downloaded models, or local database files.

For example, use `docs: document repository identity and contribution workflow` for a coherent documentation update. Keep application behavior changes in separate commits when they can be reviewed independently.

Before committing, inspect the staged diff and run checks appropriate to the change. Describe validation outcomes in the pull request, distinguishing completed checks from skipped ones.
