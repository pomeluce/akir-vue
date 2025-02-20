// 验证互斥网关
export function checkExclusiveGateway(node: WFExpressionNode | WFGatewayNode) {
  if (node.type === 'gateway') {
    return node.businessData.$type === 'exclusiveGateway';
  }
  return node.$parent?.businessData.$type === 'exclusiveGateway';
}

// 验证并行网关
export function checkParallelGateway(node: WFExpressionNode | WFGatewayNode) {
  if (node.type === 'gateway') {
    return node.businessData.$type === 'parallelGateway';
  }
  return node.$parent?.businessData.$type === 'parallelGateway';
}

// 验证默认条件
export function checkDefaultExpressionFlow(node: WFExpressionNode) {
  return node.$parent?.businessData.$type === 'exclusiveGateway' && node.$parent.$default === node;
}
