# Setup and environment

Run commands from the repository root unless a step says otherwise.

## Prerequisites

- Rust and Cargo with support for the Rust 2024 edition used by `Cargo.toml`.
- Node.js and npm. The locked Vite dependency accepts Node `^18.0.0 || ^20.0.0 || >=22.0.0`; this is a dependency compatibility range, not a support-lifecycle guarantee.
- Docker with the Compose plugin (`docker compose`).
- Available local ports `3000`, `5432`, and `11434`.
- A Tuono CLI matching the project's Tuono dependencies (`0.19.7`).

Install and verify the CLI:

```bash
cargo install tuono --version 0.19.7 --locked
tuono --version
```

Tuono documents CLI installation through Cargo in its [installation guide](https://tuono.dev/documentation/getting-started/installation). Ensure Cargo's binary directory is on your `PATH`.

## 1. Install JavaScript dependencies

```bash
npm ci
```

The repository includes `package-lock.json`. There are currently no npm scripts in `package.json`; use the Tuono CLI to run the application.

## 2. Configure the environment

The application explicitly loads **`var.env`** from the working directory. A `.env` file alone does not satisfy this startup requirement. The repository currently tracks `var.env`; review it locally and do not commit private credentials.

| Variable | Purpose | Local configuration |
| --- | --- | --- |
| `DATABASE_URL` | PostgreSQL connection string for shared database access | Match the database name, user, and password in `docker-compose.yml`; use host `localhost` and port `5432` |
| `OLLAMA_API_URL` | Ollama base URL | `http://localhost:11434/` |

If recreating `var.env`, replace the database placeholders with the values from your local Compose configuration:

```dotenv
DATABASE_URL="host=localhost port=5432 user=<database-user> password=<database-password> dbname=<database-name>"
OLLAMA_API_URL=http://localhost:11434/
```

Keep the trailing slash on `OLLAMA_API_URL`: the handlers append `api/tags` and `api/generate` directly.

The home page's database indicator uses a separate hardcoded connection string in [src/routes/index.rs](../src/routes/index.rs). Changing `DATABASE_URL` alone will not update that indicator.

## 3. Start local services

```bash
docker compose up -d
docker compose ps
docker compose exec db pg_isready -U usuario -d banco_de_dados
curl --fail http://localhost:11434/api/tags
```

The readiness command uses the database user and name currently defined in Compose. Adjust it if you change those values. Retry readiness checks while services start.

Compose currently pins PostgreSQL to `16` and Ollama to `0.1.34`. It mounts host directories under `lib/`. Verify model compatibility with that Ollama version before choosing a model, and review the Ollama volume configuration before relying on model persistence across container replacement.

## 4. Download an Ollama model

For example, to make `llama2` available:

```bash
docker compose exec ollama ollama pull llama2
docker compose exec ollama ollama list
```

The AI page discovers installed models dynamically. Model downloads require network access and sufficient disk space; inference requirements depend on the selected model.

## 5. Start the application

```bash
tuono dev
```

Open `http://localhost:3000`. Tuono generates the `.tuono` directory, including the Rust entry point referenced by `Cargo.toml`. A plain Cargo command in a fresh checkout may fail before these files exist. See Tuono's [project setup guide](https://tuono.dev/documentation/getting-started/setup-project) for the development command and generated build workflow.

## 6. Initialize a fresh database

Visit `http://localhost:3000/configuracoes` and perform these actions in order:

1. **INICIAR DB (DEBUG)** creates the schema.
2. **POPULAR DB (DEBUG)** loads sample records, including lookup values needed when creating cases.

Both actions use `/api/init_clean`:

| HTTP method | Action | Effect |
| --- | --- | --- |
| `POST` | Initialize | Creates application tables; intended for an empty schema |
| `PUT` | Populate | Inserts sample data and updates some existing records |
| `DELETE` | Clean | Drops every table in the connected database's `public` schema with `CASCADE` |

Do not run **LIMPAR DB (DEBUG)** as part of normal startup. It is a destructive reset for a disposable database. After an intentional reset, initialize the schema again before populating it. Initialization is not a migration system and fails if the tables already exist; repeated population is not guaranteed to be idempotent.

## Verify the local environment

- Request `http://localhost:3000/api/health_check`; it should return HTTP `200`. This endpoint only confirms that the application responds.
- Open `/clientes`, `/casos`, and `/relatorios` after initialization and sample-data loading.
- Upload a PDF through `/documentos`, then open `/ia-integrada`, choose an installed model and the uploaded document, and submit a question.

For PDF analysis, use a file containing extractable text; scanned images do not have an OCR fallback.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| `tuono: command not found` | Install the Rust CLI and check Cargo's binary directory in `PATH` |
| Startup reports `Error to load .env` | Despite the message, the required file is `var.env`; run from the repository root |
| Database connection fails | Check Compose readiness, port availability, and `DATABASE_URL` |
| Home DB indicator disagrees with other pages | Review the separate connection string in `src/routes/index.rs` |
| A relation does not exist | Initialize the schema using `POST /api/init_clean` |
| A relation already exists during initialization | Use the existing schema; initialization is only for an empty database |
| AI page fails or lists no models | Check Ollama availability, the URL's trailing slash, and installed models |
| PDF analysis returns no useful content | Check text extraction and the selected model's context capacity |

## Stop local services

Stop `tuono dev` with `Ctrl+C`, then run:

```bash
docker compose stop
```

This stops the containers without removing them.
