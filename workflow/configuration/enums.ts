export type WFEnumsOptions<T> = { label: string; value: T; disabled?: boolean }[];

// 通用 - 比较运算符
export type WFComparisonOperator = '>' | '>=' | '==' | '<' | '<=';
export const comparisonOperatorOptions: WFEnumsOptions<WFComparisonOperator> = [
  { label: '大于', value: '>' },
  { label: '大于等于', value: '>=' },
  { label: '等于', value: '==' },
  { label: '小于', value: '<' },
  { label: '小于等于', value: '<=' },
];

// 用户任务 - 审批对象
export const approvalObjectOptions: WFEnumsOptions<1 | 2 | 3> = [
  { label: '发起人', value: 1 },
  { label: '指定人员', value: 2 },
  { label: '指定角色', value: 3 },
];

// 用户任务 - 审批方式
export const approvalMethodOptions: WFEnumsOptions<1 | 2 | 3> = [
  { label: '依次审批', value: 1 },
  { label: '会签', value: 2 },
  { label: '或签', value: 3 },
];

// 用户任务 - 会签条件配置类型
export type WFCompletionConditionType = 'all' | 'percentage' | 'number' | 'expression';
export const completionConditionTypeOptions: WFEnumsOptions<WFCompletionConditionType> = [
  { label: '全部完成', value: 'all' },
  { label: '指定百分比', value: 'percentage' },
  { label: '指定通过数', value: 'number' },
  { label: '自定义表达式', value: 'expression' },
];

// 抄送任务 - 消息支持类型
export const copyMessageTypeOptions: WFEnumsOptions<string> = [
  { label: '站内信', value: 'site' },
  { label: '短信', value: 'message' },
  { label: '钉钉', value: 'dingtalk' },
  { label: '飞书', value: 'feishu' },
  { label: '企业微信', value: 'wechat' },
];
