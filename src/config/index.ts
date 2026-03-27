import yaml from "js-yaml";
import { readFileSync } from "fs";
import { join } from "path";

export interface StageConfig {
  tools: string[];
  run_on: string;
}

export interface PipelineConfig {
  stages: Record<string, StageConfig>;
}

export function loadConfig(filePath = "toolchain.yaml"): PipelineConfig {
  const absolutePath = join(process.cwd(), filePath);
  const raw = readFileSync(absolutePath, "utf8");
  const data = yaml.load(raw);

  if (!data || typeof data !== "object") {
    throw new Error(`Invalid configuration in ${filePath}`);
  }

  return data as PipelineConfig;
}
