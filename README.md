# Toolchain Orchestrator

A CLI-based pipeline orchestrator for common development workflows (lint, test, build, deploy-preview). Designed for small-to-mid-sized teams that want predictable, reusable pipelines without complex CI configuration.

## Why this exists

Many teams accumulate a mixture of `package.json` scripts, shell scripts, and GitHub Actions that quickly become difficult to maintain. This tool:

- Encapsulates pipeline logic in a **human-readable config file**.
- Supports conditional rules on **branch, pull request title, and file paths**.
- Executes tools in a **deterministic order** with clear, structured error reporting.

## Quick start

1. Install globally:

   ```bash
   npm install -g toolchain-orchestrator
   ```

2. Create a `toolchain.yaml` file in your repository root:

   ```yaml
   stages:
     lint:
       tools: [eslint, stylelint]
       run_on: all
     test:
       tools: [jest]
       run_on: "*.ts"
   ```

3. Run the pipeline:

   ```bash
   toolchain run
   ```

## Concepts

- **Stage**: A named step in the pipeline (for example, `lint`, `test`, `e2e`).
- **Tool**: The underlying command to run within a stage (for example, `eslint`, `jest`, `cypress`).
- **Rule**: A small piece of logic that decides whether a stage or tool should run, based on branch, title, or changed files.

## Example configuration

See [`examples/toolchain.yaml`](./examples/toolchain.yaml) for a more complete example of a multi-stage pipeline.

## Roadmap

- Richer rule engine (regex support for titles, globbing for paths).
- First-class plugin system for custom tools.
- Deeper integration with popular CI providers.

## Contributing

Contributions are very welcome. Please read [`CONTRIBUTING.md`](./CONTRIBUTING.md) for guidelines before opening an issue or pull request.

## Licence

This project is released under the MIT Licence.
