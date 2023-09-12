#!/usr/bin/env node
import { program } from "commander";
import { version } from "../package.json";

export default program.version(version);

// If this file is being run as a "main" module,
// we go ahead and execute the cli program.
// @ts-ignore
if (require.main === module) {
  console.log("Running as main module");
  // @ts-ignore
  console.log("argv", process.argv);
  // @ts-ignore
  program.parse(process.argv);
}
