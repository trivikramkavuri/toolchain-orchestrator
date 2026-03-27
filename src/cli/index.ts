#!/usr/bin/env node

import { runOrchestrator } from "../pipeline/runner";

async function main(): Promise<void> {
  const [, , command] = process.argv;

  if (command === "run") {
    console.log("Starting pipeline...");
    await runOrchestrator();
    console.log("Pipeline finished.");
  } else {
    console.error("Usage: toolchain run");
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exitCode = 1;
});
