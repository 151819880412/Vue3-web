
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
      this.cache[key] = item;
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
    cache;
    this.clear();
  }

  clear() {
    this.cache = {};
  }
}
