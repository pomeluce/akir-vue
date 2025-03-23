export default () => {
  const handleTree = (source: Record<string, any>[], id: string = 'id', parentId: string = 'parentId', children: string = 'children') => {
    const childrensMap: Record<string, Record<string, any>[]> = {};
    const nodeIdSet: Set<string> = new Set();
    const tree: Record<string, any>[] = [];

    for (const data of source) {
      const parentKey = String(data[parentId]);
      if (!childrensMap[parentKey]) childrensMap[parentKey] = [];
      nodeIdSet.add(String(data[id]));
      childrensMap[parentKey].push(data);
    }

    for (const data of source) {
      const parentKey = String(data[parentId]);
      if (!nodeIdSet.has(parentKey)) tree.push(data);
    }

    function adaptChildrenList(data: Record<string, any>): void {
      const key = String(data[id]);
      if (childrensMap[key] !== undefined) data[children] = childrensMap[key];
      if (data[children]) {
        for (const child of data[children]) {
          adaptChildrenList(child);
        }
      }
    }

    tree.forEach(adaptChildrenList);

    return tree;
  };

  return { handleTree };
};
