import { ModalOptions } from 'naive-ui';

export function capitalize(str: string): string {
  if (!str || str.length === 0) return '';
  const lower = str;
  return lower.substring(0, 1).toUpperCase() + lower.substring(1, lower.length);
}

export function modalValidator(title: ModalOptions['title'], content: ModalOptions['content'], config: Partial<Omit<ModalOptions, 'title' | 'content'>> = {}) {
  return new Promise<boolean>(resolve => {
    window.$modal.create({
      title: `  ${title}`,
      content,
      type: 'info',
      preset: 'confirm',
      positiveText: '确认',
      negativeText: '取消',
      closable: false,
      maskClosable: false,
      class: 'select-none',
      titleClass: 'flex justify-center items-center !font-medium',
      contentClass: 'py-5 text-xs',
      negativeButtonProps: { type: 'info', ghost: true },
      onPositiveClick: () => resolve(true),
      onNegativeClick: () => resolve(false),
      ...config,
    });
  });
}

/**
 * 树形数据转换
 */
export function treeDataTranslate(data: any, id: string = 'id', pid: string = 'parentId'): any[] {
  const res: any[] = [];
  const temp: any = {};
  for (let i = 0; i < data.length; i++) {
    temp[data[i][id]] = data[i];
  }
  for (let k = 0; k < data.length; k++) {
    if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
      if (!temp[data[k][pid]].children) {
        temp[data[k][pid]].children = [];
      }
      if (!temp[data[k][pid]]._level) {
        temp[data[k][pid]]._level = 1;
      }
      data[k]._level = temp[data[k][pid]]._level + 1;
      temp[data[k][pid]].children.push(data[k]);
    } else {
      res.push(data[k]);
    }
  }
  return res;
}

export function filterTreeData(treeData: any[], filterKey: string, keyword?: string): any[] {
  if (!keyword) return treeData;

  const loop = (data: any[]) => {
    const result: any[] = [];
    data.forEach(item => {
      if (item[filterKey]?.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
        result.push({ ...item });
      } else if (item.children) {
        const filterData = loop(item.children);
        if (filterData.length) {
          result.push({
            ...item,
            children: filterData,
          });
        }
      }
    });
    return result;
  };
  return loop(treeData);
}
