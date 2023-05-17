
export class Memory {
  private cache: any = {};

  get getCache() {
    return this.cache;
  }

  setCache(cache) {
    this.cache = cache;
  }

  get(key: string) {
    return this.cache[key];
  }

  set(key: string, value: any,) {
    let item = this.get(key);
    if (item) {
      this.cache[key] = value;
    } else {
      this.cache[key] = value;
    }
    return value;
  }

  remove(key: string) {
    const item = this.get(key);
    Reflect.deleteProperty(this.cache, key);
    return item;
  }

  resetCache(cache: any) {
    Object.keys(cache).forEach((key) => {
      const item = cache[key];
      if (item) {
        this.set(key, item);
      }
    });
  }

  clear() {
    this.cache = {};
  }
}
