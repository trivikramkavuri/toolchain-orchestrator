import { combineRules, matchesRule, Rule } from "../../src/pipeline/rules";

describe("matchesRule", () => {
  it("matches when branch is the same", () => {
    const rule: Rule = { branch: "develop" };
    const context = { branch: "develop", title: "", changedFiles: [] };
    expect(matchesRule(rule, context)).toBe(true);
  });

  it("does not match when branch is different", () => {
    const rule: Rule = { branch: "develop" };
    const context = { branch: "feature/foo", title: "", changedFiles: [] };
    expect(matchesRule(rule, context)).toBe(false);
  });

  it("matches based on title substring", () => {
    const rule: Rule = { title: "[e2e]" };
    const context = { branch: "develop", title: "[e2e] fix tests", changedFiles: [] };
    expect(matchesRule(rule, context)).toBe(true);
  });

  it("does not match when title substring is absent", () => {
    const rule: Rule = { title: "[e2e]" };
    const context = { branch: "develop", title: "fix: typo in README", changedFiles: [] };
    expect(matchesRule(rule, context)).toBe(false);
  });

  it("matches when at least one path is present in changedFiles", () => {
    const rule: Rule = { paths: ["e2e/"] };
    const context = {
      branch: "develop",
      title: "",
      changedFiles: ["src/app.ts", "tests/e2e/spec.ts"],
    };
    expect(matchesRule(rule, context)).toBe(true);
  });

  it("does not match when no changed file matches the path pattern", () => {
    const rule: Rule = { paths: ["e2e/"] };
    const context = { branch: "develop", title: "", changedFiles: ["src/app.ts"] };
    expect(matchesRule(rule, context)).toBe(false);
  });

  it("matches when rule has no conditions (catch-all)", () => {
    const rule: Rule = {};
    const context = { branch: "main", title: "anything", changedFiles: [] };
    expect(matchesRule(rule, context)).toBe(true);
  });
});

describe("combineRules", () => {
  it("returns true when all rules match", () => {
    const rules: Rule[] = [{ branch: "main" }, { title: "[deploy]" }];
    const context = { branch: "main", title: "[deploy] release", changedFiles: [] };
    expect(combineRules(rules, context)).toBe(true);
  });

  it("returns false when at least one rule fails", () => {
    const rules: Rule[] = [{ branch: "main" }, { title: "[deploy]" }];
    const context = { branch: "develop", title: "[deploy] release", changedFiles: [] };
    expect(combineRules(rules, context)).toBe(false);
  });

  it("returns true for an empty rule array (vacuous truth)", () => {
    const context = { branch: "main", title: "", changedFiles: [] };
    expect(combineRules([], context)).toBe(true);
  });
});
