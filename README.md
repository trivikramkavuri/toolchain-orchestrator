# Toolchain Orchestrator

A CLI tool that orchestrates common development workflows (lint, test, build, deploy‑preview) using a simple config‑driven pipeline DSL. Designed for small‑to‑mid‑sized teams that want predictable, reusable pipelines without complex CI configuration.

## Why this exists

Many teams end up with a mix of `package.json` scripts, shell scripts, and GitHub Actions that are hard to maintain. This tool:

- Embeds pipeline logic in a **human‑readable config file**.
- Allows conditional rules on **branch, PR title, and file paths**.
- Runs tools in a **deterministic order** with clear error reporting.

## Quick start

1. Install:
   ```bash
   npm install -g toolchain-orchestrator
2. Create toolchain.yaml:
  stages:
    lint:
      tools: [eslint, stylelint]
      run_on: all
    test:
      tools: [jest]
      run_on: '*.ts'
3. Run:
  toolchain run
