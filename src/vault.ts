import { exec } from "child_process";
import { isArray, isObject } from "lodash";

const callCommand = async (command: string) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      resolve(stdout ? stdout : stderr);
    });
  });
};

export const listVault = async (): Promise<OnePassword.VaultItem[]> => {
  let result;
  try {
    result = await callCommand("op vault list --format json");
  } catch (err) {
    console.log("err", err);
    return [];
  }

  if (typeof result !== "string" || result.length === 0) {
    return [];
  }

  const vaults = JSON.parse(result);

  if (isArray(vaults)) {
    return vaults.map((vault) => {
      return {
        id: vault.id,
        name: vault.name,
      };
    });
  }

  return [];
};

export const listItem = async (
  vaultId: string,
): Promise<OnePassword.Item[]> => {
  let result;
  try {
    result = await callCommand(`op item list --vault ${vaultId} --format json`);
  } catch (err) {
    console.log("err", err);
    return [];
  }

  if (typeof result !== "string" || result.length === 0) {
    return [];
  }

  const items = JSON.parse(result);
  if (!isArray(items)) {
    return [];
  }

  return items.map((it: OnePassword.Item) => {
    return {
      id: it.id,
      title: it.title,
      vault: it.vault as OnePassword.VaultItem,
    };
  });
};

export const getItemDetails = async (
  itemId: string,
): Promise<OnePassword.ItemDetails | undefined> => {
  let result;
  try {
    result = await callCommand(`op item get ${itemId} --format json`);
  } catch (err) {
    console.log("err", err);
    return;
  }

  if (typeof result !== "string" || result.length === 0) {
    return;
  }

  const it = JSON.parse(result);
  if (!isObject(it)) {
    return;
  }

  return it as OnePassword.ItemDetails;
};
