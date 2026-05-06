class FastCache {
  constructor() {
    this.cache = new Map();
    this.timestamps = new Map();
    this.defaultTTL = 2 * 60 * 1000;
  }

  set(key, data, ttl = this.defaultTTL) {
    this.cache.set(key, data);
    this.timestamps.set(key, Date.now() + ttl);
  }

  get(key) {
    const timestamp = this.timestamps.get(key);
    if (!timestamp || Date.now() > timestamp) {
      this.delete(key);
      return null;
    }
    return this.cache.get(key);
  }

  delete(key) {
    this.cache.delete(key);
    this.timestamps.delete(key);
  }

  clear(pattern = null) {
    if (pattern) {
      for (const key of this.cache.keys()) {
        if (key.includes(pattern)) {
          this.delete(key);
        }
      }
    } else {
      this.cache.clear();
      this.timestamps.clear();
    }
  }

  has(key) {
    return this.get(key) !== null;
  }

  size() {
    return this.cache.size;
  }

  keys() {
    return Array.from(this.cache.keys());
  }

  // Batch operations for better performance
  setBatch(items, ttl = this.defaultTTL) {
    const now = Date.now();
    const expiry = now + ttl;
    
    items.forEach(({ key, data }) => {
      this.cache.set(key, data);
      this.timestamps.set(key, expiry);
    });
  }

  getBatch(keys) {
    const results = {};
    const now = Date.now();
    
    keys.forEach(key => {
      const timestamp = this.timestamps.get(key);
      if (timestamp && now <= timestamp) {
        results[key] = this.cache.get(key);
      } else {
        this.delete(key);
      }
    });
    
    return results;
  }
}

// Singleton instance
const fastCache = new FastCache();

export default fastCache;
