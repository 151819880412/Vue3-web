export interface CreateStorageParams {
  storage: Storage;
}
export const createStorage = ({
  storage = sessionStorage,
}: Partial<CreateStorageParams> = {}) => {

  const WebStorage = class WebStorage {
    private storage: Storage;

    constructor() {
      this.storage = storage;
    }

    set(key: string, value: any) {
      this.storage.setItem(key, JSON.stringify(value));
    }

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
      this.storage.clear();
    }

  };
  return new WebStorage();
};
