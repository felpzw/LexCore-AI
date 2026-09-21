# LexCore AI

Legal case management with AI-assisted document analysis.

LexCore AI brings clients, legal cases, documents, and reports into one application. Built with Rust, Tuono, React, and PostgreSQL, it connects to Ollama to answer questions about uploaded PDFs.

The project is a development prototype. Its interface and domain identifiers use Portuguese; this documentation uses English.

## Capabilities

- **Client management:** create, view, update, and delete individual and corporate client records.
- **Case management:** associate cases with clients, lawyers, statuses, courts, and categories.
- **Document management:** upload, view, download, update, and delete documents linked to cases.
- **AI-assisted PDF analysis:** select an available Ollama model and ask questions using text extracted from a stored PDF.
- **Reports:** visualize documents by client and case, cases by lawyer and status, and hearings by client and lawyer.
- **Development utilities:** initialize the database schema, load sample records, and reset a disposable database.

## Technology

| Layer | Implementation |
| --- | --- |
| Application framework | Tuono 0.19.7 |
| Backend | Rust, Tokio, `tokio-postgres`, Reqwest |
| Frontend | React 19, TypeScript, Recharts |
| Database | PostgreSQL 16 |
| AI inference | Ollama |
| Local services | Docker Compose |

## Get started

Follow the [setup and environment guide](docs/SETUP_AND_ENVIRONMENT.md) for prerequisites, configuration, model installation, and database initialization.

After completing the prerequisites and configuring `var.env`, run from the repository root:

```bash
npm ci
docker compose up -d
tuono dev
```

Open `http://localhost:3000`. On a fresh database, visit `/configuracoes` to initialize the schema and load sample records before using the management pages.

The database reset action drops **every table in the connected database's public schema**. Use it only with a disposable development database.

## Documentation

| Guide | Contents |
| --- | --- |
| [Documentation index](docs/README.md) | Reading order and documentation maintenance |
| [Project overview](docs/PROJECT_OVERVIEW.md) | Architecture, modules, data flow, and current limitations |
| [Setup and environment](docs/SETUP_AND_ENVIRONMENT.md) | Local installation, configuration, and troubleshooting |
| [Git workflow](docs/GITFLOW.md) | Branching, pull requests, releases, and hotfixes |
| [Commit standards](docs/COMMIT_STANDARDS.md) | Commit format, types, scopes, and examples |

## Repository layout

```text
docs/                  Project and contributor documentation
src/app.rs             Application startup and environment loading
src/lib.rs             Shared database and query helpers
src/routes/            React pages and Rust route handlers
src/routes/api/        Backend API endpoints
src/components/        Reusable React components
src/styles/            Application styles
docker-compose.yml     PostgreSQL and Ollama services
var.env                Local runtime configuration (currently tracked)
```

## Contributing

Use the [Git workflow](docs/GITFLOW.md) and [commit standards](docs/COMMIT_STANDARDS.md). Keep changes focused, update the relevant documentation, and describe the checks actually performed in each pull request.
