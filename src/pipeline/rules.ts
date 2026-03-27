export interface Rule {
  branch?: string;
  title?: string;
  paths?: string[];
}

export interface RuleContext {
  branch: string;
  title: string;
  changedFiles: string[];
}

export function matchesRule(rule: Rule, context: RuleContext): boolean {
  if (rule.branch && context.branch !== rule.branch) {
    return false;
  }

  if (rule.title && !context.title.includes(rule.title)) {
    return false;
  }

  if (rule.paths && rule.paths.length > 0) {
    const matchesPath = rule.paths.some((pattern) =>
      context.changedFiles.some((file) => file.includes(pattern)),
    );
    if (!matchesPath) {
      return false;
    }
  }

  return true;
}
