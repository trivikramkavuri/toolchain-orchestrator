import { matchesRule, Rule } from "../../src/pipeline/rules";

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

  it("matches when at least one path is included", () => {
    const rule: Rule = { paths: ["e2e/"] };
    const context = {
      branch: "develop",
      title: "",
      changedFiles: ["src/app.ts", "tests/e2e/spec.ts"],
    };
    expect(matchesRule(rule, context)).toBe(true);
  });

  it("does not match when no changed files match paths", () => {
    const rule: Rule = { paths: ["e2e/"] };
    const context = {
      branch: "develop",
      title: "",
      changedFiles: ["src/app.ts"],
    };
    expect(matchesRule(rule, context)).toBe(false);
  });
});
