export interface StorageData {
  data: any;
  expire?: number;
}

export default (options?: { domain: 'local' | 'session' }) => {
  const storage = (options?.domain || 'local') === 'local' ? localStorage : sessionStorage;
  /**
   * 设置缓存
   * @param key 缓存的KEY
   * @param data 缓存数据
   * @param expire 过期时间
   */
  const set = (key: string, data: any, expire?: number): void => {
    let cache: StorageData = { data, expire };
    if (expire) {
      cache.expire = new Date().getTime() + expire * 1000;
    }
    storage.setItem(key, JSON.stringify(cache));
  };

  /**
   * 获取缓存
   * @param key 缓存的KEY
   * @param defaultValue 缓存不存在时的默认�?   * @returns
   */
  const get = (key: string, defaultValue: any = null): any => {
    const cacheStore = storage.getItem(key);
    if (cacheStore) {
      const cache = JSON.parse(cacheStore);
      const expire = cache?.expire;
      if (expire && expire < new Date().getTime()) {
        storage.removeItem(key);
        return defaultValue;
      }
      return cache.data;
    }
    return defaultValue;
  };

  /**
   * 删除缓存
   * @param key 缓存KEY
   */
  const remove = (key: string) => {
    storage.removeItem(key);
  };
  return { set, get, remove };
};
