// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Cache<V = any> {
  value?: V;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class Memory<T = any, V = any> {
  private cache: { [key in keyof T]?: Cache<V> } = {};

  get getCache() {
    return this.cache;
  }

  setCache(cache:Cache) {
    this.cache = cache;
  }

  get<K extends keyof T>(key: K) {
    return this.cache[key];
  }

  set<K extends keyof T>(key: K, value: V) {
    console.log(333,key,value);
    // const item = this.get(key);
    // if (item) {
    //   item.value = value;
    // } else {
    //   item = { value };
    //   this.cache[key] = item;
    // }
    return value;
  }

  remove<K extends keyof T>(key: K) {
    alert(1)
    const item = this.get(key);
    Reflect.deleteProperty(this.cache, key);
    if (item) {
      return item.value;
    }
    return null;
  }

  resetCache(cache: { [K in keyof T]: Cache }) {
    console.log(JSON.parse(JSON.stringify(cache)))
    Object.keys(cache).forEach((key) => {
      const k = key as keyof T;
      const item = cache[k];
      if (item) {
        this.set(k, item.value);
      }
    });
  }

  clear() {
    this.cache = {};
  }
}
