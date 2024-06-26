// import { isNullOrUnDef } from "@/utils/is";

export interface CreateStorageParams {
  storage: Storage;
}
export const createStorage = ({
  storage = localStorage,
}: Partial<CreateStorageParams> = {}) => {
  const WebStorage = class WebStorage {
    private storage: Storage;

    constructor() {
      this.storage = storage;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    set(key: string, value: any) {
      const stringData = JSON.stringify(value);
      this.storage.setItem(key, stringData);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get(key: string, def: any = null): any {
      const val = this.storage.getItem(key);
      if (!val) return def;
      try {
        const data = JSON.parse(val);
        // this.remove(key);
        return data
      } catch (e) {
        return def;
      }
    }

    remove(key: string) {
    this.storage.removeItem(key);
    }

    clear(): void {
    // this.storage.clear();
    }
  };

  return new WebStorage();
};
