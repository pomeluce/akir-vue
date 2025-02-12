// 基础节点类型
type WFBaseNodeType = 'task' | 'service' | 'event' | 'gateway' | 'expression' | 'subprocess';

interface WFBaseNodeBO {
  id: string;
  $type?: string;
  cls?: string;
  [key: string]: unknown;
}

// 基础节点对象
interface WFBaseNode {
  id: string;
  type: string;
  name: string;
  $next?: WFBaseNode;
  $prev?: WFBaseNode;
  $parent?: WFBaseNode;
  businessData: WFBaseNodeBO;
}

// 基础任务节点
interface WFTaskNode extends WFBaseNode {
  type: 'task';
}
// 基础服务节点
interface WFServiceNode extends WFBaseNode {
  type: 'service';
}
// 基础事件节点
interface WFEventNode extends WFBaseNode {
  type: 'event';
}

// 基础条件节点
interface WFExpressionNode extends WFBaseNode {
  type: 'expression';
  expression: string;
  $parent: WFGatewayNode;
}
// 基础网关节点
interface WFGatewayNode extends WFBaseNode {
  type: 'gateway';
  $expressions: WFExpressionNode[];
  $default?: WFExpressionNode;
}

// 基础子流程节点
interface WFSubprocessNode extends WFBaseNode {
  type: 'subprocess';
  $start?: WFEventNode;
}

// 辅助的网关条件分支
interface WFBranchNodeList {
  expression: WFExpressionNode;
  nextNodeList: WFBaseNode[];
}
