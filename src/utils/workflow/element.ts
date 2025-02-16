import type { Ref } from 'vue';
import { ids } from './id';

// 节点记录表
export const nodeMaps: Map<WFBaseNode['id'], WFBaseNode> = new Map();
/**
 * 记录新节点
 * @param node
 */
export function setNodeInMap(node: WFBaseNode) {
  nodeMaps.set(node.id, node);
  return node;
}
/**
 * 读取节点
 * @param id 节点 id
 */
export function getNodeInMap(id: WFBaseNode['id']) {
  return nodeMaps.get(id);
}
/**
 * 移除指定节点
 * @param id
 */
export function removeNodeInMap(id: WFBaseNode['id']) {
  const node = nodeMaps.get(id);
  nodeMaps.delete(id);
  return node;
}
/**
 * 清空节点记录表
 */
export function clearNodeMap() {
  nodeMaps.clear();
}

export const DEFAULT_NAME_MAP = {
  event: '事件',
  gateway: '网关',
  task: '任务',
  service: '服务',
  subprocess: '子流程',
  expression: '条件',
};
export const DEFAULT_BPMN_TYPE_MAP = {
  event: 'event',
  gateway: 'exclusiveGateway',
  task: 'task',
  service: 'serviceTask',
  subprocess: 'subProcess',
  expression: 'sequenceFlow',
};

/**
 * 创建节点
 */ type WFNodeForType<T extends WFBaseNodeType> = T extends 'gateway'
  ? WFGatewayNode
  : T extends 'expression'
    ? WFExpressionNode
    : T extends 'task'
      ? WFTaskNode
      : T extends 'service'
        ? WFServiceNode
        : T extends 'event'
          ? WFEventNode
          : T extends 'subprocess'
            ? WFSubprocessNode
            : WFBaseNode;
export function createNode<T extends WFBaseNodeType>(type: T, parent?: WFBaseNode, name?: string, bo?: Record<string, unknown>): WFNodeForType<T> {
  const n = name || DEFAULT_NAME_MAP[type] || type;
  const id = ids(type);
  const base: WFBaseNode = reactive({
    id,
    type,
    name: n,
    $prev: undefined,
    $next: undefined,
    $parent: parent,
    businessData: { $type: DEFAULT_BPMN_TYPE_MAP[type] || type, ...(bo || {}), id },
  });

  if (type === 'gateway') {
    const $expressions: WFExpressionNode[] = [];
    const gatewayNode = reactive({
      ...base,
      $expressions,
    }) as WFGatewayNode;

    const prefix = bo?.$type === 'parallelGateway' ? '分支' : '条件';
    const expressionNode1: WFExpressionNode = createNode('expression', gatewayNode, `${prefix}-1`);
    const expressionNode2: WFExpressionNode = createNode('expression', gatewayNode, `${prefix}-2`);

    $expressions.push(expressionNode1, expressionNode2);

    if (bo?.$type !== 'parallelGateway') {
      gatewayNode.$default = expressionNode1;
    }

    setNodeInMap(expressionNode1);
    setNodeInMap(expressionNode2);

    return gatewayNode as WFNodeForType<T>;
  }
  if (type === 'expression') {
    return reactive({ ...base }) as WFNodeForType<T>;
  }
  if (type === 'service') {
    return reactive({ ...base }) as WFNodeForType<T>;
  }
  if (type === 'task') {
    return reactive({ ...base }) as WFNodeForType<T>;
  }
  if (type === 'subprocess') {
    const subprocess = reactive({ ...base }) as WFSubprocessNode;

    const subprocessStart = createNode('event', subprocess, '开始', {
      $type: 'startEvent',
      cls: 'start-event',
    });
    const subprocessEnd = createNode('event', subprocess, '结束', { $type: 'endEvent', cls: 'end-event' });
    subprocessStart.$next = subprocessEnd;
    subprocessEnd.$prev = subprocessStart;
    subprocess.$start = subprocessStart;
    setNodeInMap(subprocessStart);
    setNodeInMap(subprocessEnd);

    return subprocess as WFNodeForType<T>;
  }
  if (type === 'event') {
    return reactive({ ...base }) as WFNodeForType<T>;
  }

  return reactive({ ...base }) as WFNodeForType<T>;
}

/**
 * 追加新节点
 * @param curNode 当前节点
 * @param newNode 追加节点
 */
export function appendNode(curNode: Ref<WFBaseNode>, newNode: Ref<WFBaseNode>): Ref<WFBaseNode> {
  const nextNode = curNode.value.$next;

  curNode.value.$next = newNode.value;
  newNode.value.$prev = curNode.value;

  // 更新 parent
  newNode.value.$parent = curNode.value.$parent;

  if (nextNode) {
    nextNode.$prev = newNode.value;
    newNode.value.$next = nextNode;
  }

  setNodeInMap(newNode.value);

  return newNode;
}

/**
 * 移除节点
 * @param curNode 被移除的目标节点
 */
export function removeNode(curNode: WFBaseNode): WFBaseNode {
  const $prev = curNode.$prev;
  const $next = curNode.$next;
  if ($prev) {
    $prev.$next = $next;
  }
  if ($next) {
    $next.$prev = $prev;
  }

  curNode.$prev = undefined;
  curNode.$next = undefined;

  removeNodeInMap(curNode.id);

  if (curNode.type === 'gateway') {
    removeGatewayNode(curNode as WFGatewayNode);
  }
  if (curNode.type === 'expression') {
    removeExpressionNode(curNode as WFExpressionNode);
  }
  if (curNode.type === 'subprocess') {
    removeSubprocessNode(curNode as WFSubprocessNode);
  }

  return curNode;
}
// 移除条件节点
export function removeExpressionNode(node: WFExpressionNode) {
  // step 1: 从父节点中移除
  const parent = node.$parent;
  parent.$expressions = parent.$expressions.filter(e => e.id !== node.id);
  // step 2: 移除后续节点
  let nextNode: WFBaseNode | undefined = node.$next;
  while (nextNode) {
    const n = removeNode(nextNode);
    nextNode = n.$next;
  }
  // step 3: 如果移除该条件后剩余条件不足 2，则同时移除网关节点
  if (node.$parent.$expressions.length < 2) {
    removeNode(node.$parent);
  }
}
// 移除子流程节点
export function removeSubprocessNode(node: WFSubprocessNode) {
  // step 1: 移除内部节点
  let nextNode: WFBaseNode | undefined = node.$start;
  while (nextNode) {
    const n = removeNode(nextNode);
    nextNode = n.$next;
  }
}
// 移除网关节点
export function removeGatewayNode(node: WFGatewayNode) {
  for (const nodeElement of node.$expressions) {
    removeNode(nodeElement);
  }
}

/**
 * 移动节点到目标节点后面
 * @param targetNode 目标节点
 * @param node 被移动节点
 */
export function moveNode(targetNode: Ref<WFBaseNode>, node: Ref<WFBaseNode>): Ref<WFBaseNode> {
  setDragData();
  removeNode(node.value);
  return appendNode(targetNode, node);
}

/**
 * 设置节点拖动状态
 */
let dragData: Ref<WFBaseNode> | undefined;
/**
 * 设置被拖拽节点
 // * @param event 事件对象
 * @param node 被拖拽节点
 */
export function setDragData(node?: Ref<WFBaseNode>) {
  dragData = node;
  // event.dataTransfer?.setData('node-id', node.value.id)
}
/**
 * 获取被拖拽节点
 // * @param event 事件对象
 */
export function getDragData() {
  // event.preventDefault()
  // const id = event.dataTransfer?.getData('node-id')
  //
  // if (!id) {
  //   return
  // }
  // return getNodeInMap(id)
  return dragData;
}

/**
 * 创建基础节点数据
 */
export function createPresetProcess() {
  const start = createNode('event', undefined, '开始', {
    $type: 'startEvent',
    cls: 'start-event',
    name: '开始',
  });
  const end = createNode('event', undefined, '结束', {
    $type: 'endEvent',
    cls: 'end-event',
    name: '结束',
  });

  setNodeInMap(start);
  setNodeInMap(end);

  start.$next = end;
  end.$prev = start;

  return start;
}

/**
 * 节点类型判断部分
 */
export function isWFEventNode(node: WFBaseNode): node is WFEventNode {
  return node.type === 'event';
}
export function isTaskNode(node: WFBaseNode): node is WFTaskNode {
  return node.type === 'task';
}
export function isGatewayNode(node: WFBaseNode): node is WFGatewayNode {
  return node.type === 'gateway';
}
export function isExpressionNode(node: WFBaseNode): node is WFExpressionNode {
  return node.type === 'expression';
}
export function isServiceNode(node: WFBaseNode): node is WFServiceNode {
  return node.type === 'service';
}
export function isSubprocessNode(node: WFBaseNode): node is WFSubprocessNode {
  return node.type === 'subprocess';
}
