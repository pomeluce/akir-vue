export default () => {
  /**
   * 在深层嵌套数组中查找满足指定条件的对象
   *
   * 此函数会遍历给定的数组, 对每个对象判断其是否满足传入的条件(condition 对象中指定的属性值全部相等)
   * 如果当前对象满足条件, 则返回该对象; 否则, 如果对象的指定属性(deepKey)对应的值为数组, 则递归在该数组中查找
   *
   * @template T 数组中元素的类型
   * @param {T[]} arrays - 要遍历的数组
   * @param {Partial<Record<keyof T, any>>} condition - 用于匹配的条件对象, 要求对象中所有指定属性的值必须与之相等
   * @param {keyof T} deepKey - 指定用于嵌套查找的属性名, 其值应为数组
   * @returns {T | undefined} 返回第一个满足条件的对象, 如果没有找到则返回 undefined
   *
   * @example
   * interface TreeNode {
   *   id: number;
   *   name: string;
   *   children?: TreeNode[];
   * }
   *
   * const tree: TreeNode[] = [
   *   {
   *     id: 1,
   *     name: 'root',
   *     children: [
   *       {
   *         id: 2,
   *         name: 'child1',
   *         children: [{ id: 3, name: 'child1.1' }],
   *       },
   *       { id: 4, name: 'child2' },
   *     ],
   *   },
   *   { id: 5, name: 'another root' },
   * ];
   *
   * const foundNode = findDeep(tree, { id: 3 }, 'children');
   * // 输出: { id: 3, name: 'child1.1' }
   */
  const findDeep = <T,>(arrays: T[], condition: Partial<Record<keyof T, any>>, deepKey: keyof T): T | undefined => {
    for (const item of arrays) {
      const result = Object.entries(condition).every(([key, value]) => item[key as keyof T] === value);
      if (result) return item;
      const deepArray = item[deepKey];
      if (Array.isArray(deepArray)) {
        const result = findDeep(deepArray, condition, deepKey);
        if (result) return result;
      }
    }

    return undefined;
  };

  return { findDeep };
};
