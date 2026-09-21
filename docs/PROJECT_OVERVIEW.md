# Project overview

## Purpose

LexCore AI is a legal management prototype for organizing client records, cases, and documents, with an Ollama integration for questions about PDF content. The application combines relational data management with document analysis and visual reports.

The source is maintained at [felpzw/LexCore-AI](https://github.com/felpzw/LexCore-AI) under the [MIT license](../LICENSE). See [repository identity](REPOSITORY.md) for the project's previous names and open-source attribution.

## Implemented modules

| Module | Page | Behavior |
| --- | --- | --- |
| Home | `/` | Introduction and API/database status indicators |
| Clients | `/clientes` | CRUD for individuals and companies |
| Cases | `/casos` | CRUD with client, lawyer, status, court, and category relationships |
| Documents | `/documentos` | File and metadata management for case documents |
| AI analysis | `/ia-integrada` | Model discovery and questions about stored PDFs |
| Reports | `/relatorios` | Charts for documents, cases, and hearings |
| Settings | `/configuracoes` | Development schema initialization, sample data, and table deletion |

## Architecture

Tuono connects React/TypeScript pages with Rust handlers in [src/routes](../src/routes). Shared frontend elements live in [src/components](../src/components), and the application layout is defined in [src/routes/__layout.tsx](../src/routes/__layout.tsx).

[src/app.rs](../src/app.rs) loads `var.env` at startup and supplies a shared HTTP client. [src/lib.rs](../src/lib.rs) provides the database connection helper and query-string parsing. Most database access uses `DATABASE_URL`; the home page's status check currently has a separate hardcoded connection string.

The application runs on the host during development. [Docker Compose](../docker-compose.yml) runs PostgreSQL and Ollama, exposed on ports `5432` and `11434` respectively.

## Data model

The schema is defined in [src/routes/api/init_clean.rs](../src/routes/api/init_clean.rs).

- `Cliente` stores shared client information; `Pessoa_Fisica` and `Pessoa_Juridica` store individual and company identifiers.
- `Caso` connects a client and lawyer with status, court, and category records.
- `Documento` stores case-linked metadata and file bytes in PostgreSQL (`BYTEA`).
- `Audiencia`, `Andamento_processual`, `Pecas`, and `Tarefa` represent hearings, case progress, filings, and tasks. Their presence in the schema does not imply dedicated management screens.

## AI request flow

1. The AI page requests the configured Ollama service's `api/tags` endpoint to list installed models and queries PostgreSQL for available documents.
2. The user selects a document and model, then submits a question to `POST /api/ollama`.
3. The backend retrieves the document by filename and extracts PDF text with `pdf-extract`.
4. The backend combines the extracted text with the question and sends a non-streaming request to Ollama's `api/generate` endpoint.
5. The generated response is returned to the interface.

The current implementation sends extracted text directly in the prompt. It does not implement OCR, document chunking, or a vector search index. Inference uses the service configured by `OLLAMA_API_URL`; a remote URL sends the extracted text to that remote service.

## Reports

[The report handler](../src/routes/relatorios/index.rs) aggregates relational data for [the Recharts interface](../src/routes/relatorios/index.tsx):

- Documents grouped by client and case.
- Cases grouped by lawyer and status.
- Hearings grouped by client and lawyer.

## Current boundaries

The repository contains development endpoints for dropping tables and loading sample records, with no authentication checks in those handlers. It also contains tracked development credentials and a hardcoded home-page database connection. The setup described here is intended for a local development environment.

Contract or petition generation is not implemented by the PDF question-answering endpoint. Homepage marketing text and sample metrics are not evidence of implemented features or measured usage.

The package/crate identifier is currently `tuono-app` (`tuono_app` in Rust imports). The repository directory and technical identifiers retain their existing names while the product is presented as LexCore AI.
