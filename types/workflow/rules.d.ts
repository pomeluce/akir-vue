// 节点可用操作前置验证规则
type WFCanRuleValidator = (targetNode?: WFBaseNode, node?: WFBaseNode) => boolean;
type WFCanRemove = WFCanRuleValidator | boolean;
type WFCanAppend = WFCanRuleValidator | boolean;
type WFCanMove = WFCanRuleValidator | boolean;
type WFCanDropped = WFCanRuleValidator | boolean;

// 节点操作后置可执行验证规则
type WFAsyncExecutionValidator = (node?: WFBaseNode) => Promise<{ status: boolean; message?: string }>;
type WFExecutionValidator = (node?: WFBaseNode) => { status: boolean; message?: string | string[] };

// 前置操作
type WFPreBehavior = (node: WFBaseNode) => Promise<boolean> | boolean;
