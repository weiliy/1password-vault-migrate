import program from "./cli";
import { CommanderError } from "commander";

describe("info", () => {
  it("show version", () => {
    try {
      program.exitOverride().parse(["node", "cli", "--version"]);
    } catch (err) {
      expect(err instanceof CommanderError).toBeTruthy();
      expect(err.code).toBe("commander.version");
      expect(err.exitCode).toBe(0);
      expect(err.message).toBe("0.1.0");
    }
  });
});
