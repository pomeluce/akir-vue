import dayjs from 'dayjs';
// 导入本地化语言
import 'dayjs/locale/zh-cn';
// 使用相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime';
// 使用本地化语言
dayjs.locale('zh-cn');
// 使用相对时间插件
dayjs.extend(relativeTime);

const setup = () => {};
export { setup };
