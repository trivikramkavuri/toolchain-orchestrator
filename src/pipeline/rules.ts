/**
 * A Rule describes the conditions under which a pipeline stage should run.
 * All supplied conditions must be satisfied (logical AND).
 */
export interface Rule {
  /** Only run if the current branch exactly matches this value. */
  branch?: string;
  /** Only run if the pull-request title contains this substring. */
  title?: string;
  /** Only run if at least one changed file path contains one of these substrings. */
  paths?: string[];
}

/** Runtime context derived from git and CI environment variables. */
export interface RuleContext {
  branch: string;
  title: string;
  changedFiles: string[];
}

/**
 * Returns true when every condition declared in `rule` is satisfied by `context`.
 *
 * @example
 * matchesRule({ branch: "main" }, { branch: "main", title: "", changedFiles: [] }); // true
 * matchesRule({ title: "[e2e]" }, { branch: "dev", title: "fix: typo", changedFiles: [] }); // false
 */
export function matchesRule(rule: Rule, context: RuleContext): boolean {
  if (rule.branch && context.branch !== rule.branch) {
    return false;
  }

  if (rule.title && !context.title.includes(rule.title)) {
    return false;
  }

  if (rule.paths && rule.paths.length > 0) {
    const anyPathMatches = rule.paths.some((pattern) =>
      context.changedFiles.some((file) => file.includes(pattern)),
    );
    if (!anyPathMatches) {
      return false;
    }
  }

  return true;
}

/**
 * Returns true only when ALL supplied rules match (logical AND across rules).
 * Useful for composing complex conditions without nesting.
 */
export function combineRules(rules: Rule[], context: RuleContext): boolean {
  return rules.every((rule) => matchesRule(rule, context));
}
