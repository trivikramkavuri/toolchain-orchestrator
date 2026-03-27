import { loadConfig, PipelineConfig, StageConfig } from "../config";
import { matchesRule, RuleContext } from "./rules";

/**
 * Executes a single named tool.
 * Stub implementation – in production wire up `execa` or `child_process.spawn`.
 */
async function executeTool(tool: string): Promise<void> {
  const start = Date.now();
  console.log(`  [tool] Starting "${tool}"...`);

  switch (tool) {
    case "eslint":
    case "jest":
    case "cypress":
    case "stylelint":
    case "prettier":
      // Real implementation would spawn the binary here.
      await new Promise((resolve) => setTimeout(resolve, 300));
      break;
    default:
      throw new Error(
        `[toolchain] Unknown tool "${tool}". ` +
          `Add it to the switch statement in src/pipeline/runner.ts or ` +
          `provide a plugin that handles it.`,
      );
  }

  const elapsed = Date.now() - start;
  console.log(`  [tool] "${tool}" finished in ${elapsed}ms.`);
}

/** Builds a default execution context from the environment. */
function getDefaultContext(): RuleContext {
  // In CI these would come from env vars (GITHUB_REF_NAME, PR title, etc.).
  return {
    branch: process.env.GITHUB_REF_NAME ?? "main",
    title: process.env.PR_TITLE ?? "",
    changedFiles: [],
  };
}

/** Main entry point: loads config and runs every stage in order. */
export async function runOrchestrator(): Promise<void> {
  const config: PipelineConfig = loadConfig("toolchain.yaml");
  const context = getDefaultContext();
  const stageNames = Object.keys(config.stages);

  console.log(`[toolchain] Running ${stageNames.length} stage(s): ${stageNames.join(" → ")}`);

  for (const [name, stage] of Object.entries(config.stages)) {
    console.log(`\n[toolchain] ── Stage: ${name} ──`);
    await runStage(name, stage, context);
  }

  console.log("\n[toolchain] All stages completed successfully.");
}

async function runStage(
  stageName: string,
  stage: StageConfig,
  context: RuleContext,
): Promise<void> {
  // Apply any rules attached to this stage before running tools.
  if (stage.run_on !== "all") {
    const shouldRun = matchesRule({ title: stage.run_on }, context);
    if (!shouldRun) {
      console.log(`  [toolchain] Skipping stage "${stageName}" (rule did not match).`);
      return;
    }
  }

  for (const tool of stage.tools) {
    console.log(`  [toolchain] Executing tool: ${tool}`);
    await executeTool(tool);
  }
}
