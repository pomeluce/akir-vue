export type WFEnumsOptions<T> = { label: string; value: T; disabled?: boolean }[];

// 抄送任务 - 消息支持类型
export const copyMessageTypeOptions: WFEnumsOptions<string> = [
  { label: '站内信', value: 'site' },
  { label: '短信', value: 'message' },
  { label: '钉钉', value: 'dingtalk' },
  { label: '飞书', value: 'feishu' },
  { label: '企业微信', value: 'wechat' },
];
