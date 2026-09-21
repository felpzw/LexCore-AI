# Repository identity and GitHub About

## Canonical references

| Field | Value |
| --- | --- |
| Product | LexCore AI |
| Source repository | [felpzw/LexCore-AI](https://github.com/felpzw/LexCore-AI) |
| Clone URL | `https://github.com/felpzw/LexCore-AI.git` |
| Issue tracker | [GitHub Issues](https://github.com/felpzw/LexCore-AI/issues) |
| License | [MIT](../LICENSE) |
| Contribution branch | `develop` |
| Release branch | `master` |

Use the canonical repository URL in documentation and package metadata. The historical repository URL, `https://github.com/felpzw/Projeto-Banco-de-Dados`, resolves to the same GitHub repository. Earlier documentation called the application **Jurídico IA**. These are previous names of this project, not a separate upstream project.

The npm package and Rust crate retain the internal identifier `tuono-app` for compatibility with the existing application. Public descriptions use **LexCore AI**.

## GitHub About values

**Description**

```text
Legal case management with AI-assisted PDF analysis, built with Rust, Tuono, React, PostgreSQL, and Ollama.
```

**Website**

```text
https://github.com/felpzw/LexCore-AI#readme
```

This points to the project documentation. It does not claim that a hosted application is available.

**Topics**

```text
legal-tech, case-management, document-management, artificial-intelligence, rust, tuono, react, typescript, postgresql, ollama, pdf, open-source
```

GitHub stores the About description, website, and topics as repository settings. Committing or pushing these files does not apply those settings. A maintainer can copy the values into the About editor on the repository page or run the following command with an authenticated GitHub CLI:

```bash
gh repo edit felpzw/LexCore-AI \
  --description "Legal case management with AI-assisted PDF analysis, built with Rust, Tuono, React, PostgreSQL, and Ollama." \
  --homepage "https://github.com/felpzw/LexCore-AI#readme" \
  --add-topic legal-tech,case-management,document-management,artificial-intelligence,rust,tuono,react,typescript,postgresql,ollama,pdf,open-source
```

This is a separate repository settings operation; it is not part of the branch push or pull-request merge.

## Open-source attribution

LexCore AI is distributed under the [MIT license](../LICENSE). Preserve the copyright and permission notice when redistributing copies or substantial portions of the software.

The application uses open-source projects including [Tuono](https://github.com/tuono-labs/tuono), [React](https://github.com/facebook/react), [PostgreSQL](https://www.postgresql.org/), [Ollama](https://github.com/ollama/ollama), and [Recharts](https://github.com/recharts/recharts). These links acknowledge technologies used by the application and do not imply endorsement.

Dependencies and downloaded models retain their own licenses. The project license does not replace those terms. See [Cargo.toml](../Cargo.toml), [Cargo.lock](../Cargo.lock), [package.json](../package.json), and [package-lock.json](../package-lock.json) for the dependency declarations and resolved versions.
