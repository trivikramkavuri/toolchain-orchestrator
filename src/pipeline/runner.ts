import { loadConfig, PipelineConfig, StageConfig } from "../config";
import { RuleContext } from "./rules";

async function executeTool(tool: string): Promise<void> {
  // Stub implementation. In production, use `child_process` or `execa`.
  switch (tool) {
    case "eslint":
      console.log("  Running eslint...");
      break;
    case "jest":
      console.log("  Running jest...");
      break;
    case "cypress":
      console.log("  Running cypress...");
      break;
    default:
      console.warn(`  Unknown tool "${tool}", skipping.`);
  }
  await new Promise((resolve) => setTimeout(resolve, 500));
}

function getDefaultContext(): RuleContext {
  // In production, derive these from git and CI environment variables.
  return {
    branch: "main",
    title: "",
    changedFiles: [],
  };
}

export async function runOrchestrator(): Promise<void> {
  const config: PipelineConfig = loadConfig("toolchain.yaml");
  const context = getDefaultContext();

  for (const [name, stage] of Object.entries(config.stages)) {
    console.log(`\n=== Stage: ${name} ===`);
    await runStage(stage, context);
  }
}

async function runStage(stage: StageConfig, _context: RuleContext): Promise<void> {
  for (const tool of stage.tools) {
    console.log(`-> Executing tool: ${tool}`);
    await executeTool(tool);
  }
}
