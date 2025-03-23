interface MenuModel {
  menuId: string;
  code: string;
  label: string;
  sort: int;
  show: boolean;
  disabled: boolean;
  parentId: string;
  target: string;
  createBy: string;
  createTime: number;
  updateBy: string;
  updateTime: number;
  remark: string;
}

interface MenuModelTree extends MenuModel {
  children?: MenuModelTree[];
}
