declare namespace OnePassword {
  interface VaultItem {
    id: string;
    name: string;
  }

  interface Item {
    id: string;
    title: string;
    vault: VaultItem;
  }

  interface ItemDetails extends Item {
    [key: string]:
      | number
      | string
      | boolean
      | undefined
      | Record<string, unknown>[];
  }
}
