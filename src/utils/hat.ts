class Hat {
  static generate(bits: number = 128, base: number = 16): string {
    if (bits <= 0) return '0';

    let digits = Math.log2(Math.pow(2, bits)) / Math.log2(base);
    for (let i = 2; digits === Infinity; i *= 2) {
      digits = (Math.log2(Math.pow(2, bits / i)) / Math.log2(base)) * i;
    }

    let rem = digits - Math.floor(digits);
    let res = '';

    for (let i = 0; i < Math.floor(digits); i++) {
      const x = Math.floor(Math.random() * base).toString(base);
      res = x + res;
    }

    if (rem) {
      const b = Math.pow(base, rem);
      const x = Math.floor(Math.random() * b).toString(base);
      res = x + res;
    }

    const parsed = parseInt(res, base);
    return parsed !== Infinity && parsed >= Math.pow(2, bits) ? Hat.generate(bits, base) : res;
  }
}

class HatRack<T> {
  private hats: Map<string, T> = new Map();
  private bits: number;
  private base: number;
  private expandBy?: number;

  constructor(bits: number = 128, base: number = 16, expandBy?: number) {
    this.bits = bits;
    this.base = base;
    this.expandBy = expandBy;
  }

  create(data: T): string {
    let id: string;
    let attempts = 0;

    do {
      if (attempts++ > 10) {
        if (this.expandBy) {
          this.bits += this.expandBy;
        } else {
          throw new Error('Too many ID collisions, use more bits');
        }
      }
      id = Hat.generate(this.bits, this.base);
    } while (this.hats.has(id));

    this.hats.set(id, data);
    return id;
  }

  get(id: string): T | undefined {
    return this.hats.get(id);
  }

  set(id: string, value: T): this {
    this.hats.set(id, value);
    return this;
  }

  public getHats(): string[] {
    return Array.from(this.hats.keys());
  }
}

/**
 * Ids class for generating and managing ids
 */
class HatId {
  private _seed: HatRack<any>;

  constructor(seed?: [number, number, number]) {
    seed = seed || [128, 36, 1];
    this._seed = new HatRack(seed[0], seed[1], seed[2]);
  }

  /**
   * Generate a next id.
   *
   * @param {Object} [element] element to bind the id to
   *
   * @return {String} id
   */
  public next(element?: any): string {
    return this._seed.create(element || true);
  }

  /**
   * Generate a next id with a given prefix.
   *
   * @param {string} prefix
   * @param {Object} [element] element to bind the id to
   *
   * @return {String} id
   */
  public nextPrefixed(prefix: string, element?: any): string {
    let id: string;

    do {
      id = prefix + this.next(true);
    } while (this.assigned(id));

    // claim {prefix}{random}
    this.claim(id, element);

    // return
    return id;
  }

  /**
   * Manually claim an existing id.
   *
   * @param {String} id
   * @param {String} [element] element the id is claimed by
   */
  public claim(id: string, element?: any): void {
    this._seed.set(id, element || true);
  }

  /**
   * Returns true if the given id has already been assigned.
   *
   * @param  {String} id
   * @return {Boolean}
   */
  public assigned(id: string): boolean {
    return !!this._seed.get(id);
  }

  /**
   * Unclaim an id.
   *
   * @param  {String} id the id to unclaim
   */
  public unclaim(id: string): void {
    this._seed.set(id, undefined);
  }

  /**
   * Clear all claimed ids.
   */
  public clear(): void {
    // 遍历所有已声明的 ID 并解除它们
    const hats = this._seed.getHats(); // 使用 `getHats` 方法获取所有 ID
    for (const id of hats) {
      this.unclaim(id);
    }
  }
}

export { Hat, HatRack, HatId };
