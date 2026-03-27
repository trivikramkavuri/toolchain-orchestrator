# Toolchain Orchestrator

[![CI](https://github.com/trivikramkavuri/toolchain-orchestrator/actions/workflows/ci.yml/badge.svg)](https://github.com/trivikramkavuri/toolchain-orchestrator/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

A CLI-based pipeline orchestrator for common development workflows (lint, test, build, deploy-preview). Designed for small-to-mid-sized teams that want predictable, reusable pipelines without complex CI configuration.

## Why this exists

Many teams accumulate a mixture of `package.json` scripts, shell scripts, and GitHub Actions that quickly become difficult to maintain. This tool:

- Encapsulates pipeline logic in a **human-readable config file**.
- Supports conditional rules on **branch, pull request title, and file paths**.
- Executes tools in a **deterministic order** with clear, structured error reporting.
- Can be installed globally via npm and reused across every project in a monorepo.

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
     e2e:
       tools: [cypress]
       run_on: '[e2e]'
   ```

3. Run the pipeline:

   ```bash
   toolchain run
   ```

## Concepts

- **Stage**: A named step in the pipeline (for example, `lint`, `test`, `e2e`). Stages run in the order they are declared.
- **Tool**: The underlying command to run within a stage (for example, `eslint`, `jest`, `cypress`). Multiple tools in a stage run sequentially.
- **Rule**: A small piece of logic that decides whether a stage should execute. Rules can match on branch name, PR title substring, or changed file paths.
- **`combineRules()`**: A utility for composing multiple rules with logical AND, allowing complex conditions without nesting.

## Configuration reference

| Key | Type | Description |
|---|---|---|
| `stages` | `object` | Map of stage name to stage config |
| `stages.<name>.tools` | `string[]` | Ordered list of tools to run |
| `stages.<name>.run_on` | `string` | `"all"` to always run, or a title/path substring to match |

## Example configuration

See [`examples/toolchain.yaml`](./examples/toolchain.yaml) for a complete multi-stage pipeline.

## Roadmap

- [ ] Publish as an npm package for wider consumption.
- [ ] Richer rule engine (regex support for titles, globbing for paths).
- [ ] First-class plugin system for custom tools.
- [ ] Parallel stage execution for independent stages.
- [ ] Deeper integration with popular CI providers (GitHub Actions, GitLab CI).

## Contributing

Contributions are very welcome. Please read [`CONTRIBUTING.md`](./CONTRIBUTING.md) for guidelines before opening an issue or pull request.

## Licence

This project is released under the MIT Licence. See [`LICENSE`](./LICENSE) for the full text.
