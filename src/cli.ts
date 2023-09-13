#!/usr/bin/env node
import { Command } from "commander";
import { version } from "../package.json";
import { getItemDetails, listItem, listVault } from "./vault";

const program = new Command();

program.version(version);

program
  .command("list-vault")
  .description("list all vaults")
  .action(async () => {
    console.log("call listVault");
    const output = await listVault();
    console.log("output", output);
  });

program
  .command("list-item")
  .description("list all items in a vault")
  .argument("<vaultId>", "vault id")
  .action(async (vaultId: string) => {
    console.log("call listItem");
    const output = await listItem(vaultId);
    console.log("output", output);
  });

program
  .command("get-item")
  .description("get the specific items in a vault")
  .argument("<itemid>", "item id")
  .action(async (itemId: string) => {
    console.log("call get-item-details");
    const output = await getItemDetails(itemId);
    console.log("output", output);
  });

program
  .command("export-vault")
  .description("export all items in a vault")
  .argument("<vaultId>", "vault id")
  .action(async (vaultId: string) => {
    console.log("call listItem");
    const items = await listItem(vaultId);
    const output = await Promise.all(
      items.map(async (it) => {
        return await getItemDetails(it.id);
      }),
    );
    console.log("output", JSON.stringify(output));
  });

export default program;

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
