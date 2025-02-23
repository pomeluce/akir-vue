/* user 对象模型 */
interface UserModel {
  id: number;
  account: string;
  password: string;
  username: string;
  gender: number;
  status: number;
  email: string;
  avatar: string;
  phone: string;
  technique: string[];
  createBy: string;
  createTime: number;
  updateBy: string;
  updateTime: number;
  remark: string;
}
