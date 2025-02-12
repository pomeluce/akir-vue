// 默认规则与校验部分

import { isExpressionNode, isSubprocessNode, modalValidator } from '@/utils/workflow';
import { checkParallelGateway } from './node-checker';

// 可移除
export const defaultRemoveValidator: WFCanRemove = node => {
  if (!node) return false;
  // 网关节点不能直接移除
  if (node.type === 'gateway') return false;
  // 开始结束节点不能直接移除
  if (node.businessData?.$type === 'endEvent' || node.businessData?.$type === 'startEvent') return false;
  // 其他节点可以移除
  return true;
};
// 可追加判断
export const defaultAppendValidator: WFCanAppend = node => {
  if (!node) return false;
  return node.businessData?.$type !== 'endEvent';
};
// 可移动判断
export const defaultMoveValidator: WFCanMove = node => {
  if (!node) return false;
  return node.businessData?.$type !== 'endEvent' && node.businessData?.$type !== 'startEvent' && node.type !== 'expression' && node.type !== 'gateway';
};
// 可放置判断
export const defaultDropValidator: WFCanDropped = (target, node) => {
  if (!node) return false;

  if (node.type === 'gateway' || node.type === 'subprocess') {
    let $parent = target?.$parent;
    while ($parent) {
      if ($parent.id === node.id) {
        return false;
      }
      $parent = $parent.$parent;
    }
  }

  return target!.$next?.id !== node.id && target!.id !== node.id;
};
// 节点完整性判断
export const defaultCompletenessValidator: WFExecutionValidator = target => {
  if (!target) return { status: false, message: '缺少校验节点' };

  const bo = target.businessData;
  const errorMsg: string[] = [];

  switch (target.type) {
    case 'expression':
      if (checkParallelGateway(target as WFExpressionNode)) {
        return { status: true };
      }
      if ((target as WFExpressionNode).$parent?.$default === target) {
        return { status: true };
      }
      if ((target as WFExpressionNode).expression) {
        return { status: true };
      }
      return { status: false, message: '缺少流转条件配置' };

    case 'subprocess':
      if ((target as WFSubprocessNode).$start) {
        return { status: true };
      }
      return { status: false, message: '缺少开始节点' };

    case 'task':
      if (bo?.$type === 'userTask') {
        if (!bo.approvalObject) {
          return { status: false, message: '缺少审批配置' };
        }
        if (bo.approvalObject === 2 && !(bo.candidateUsers as any[])?.length) {
          return { status: false, message: '缺少指定审批人配置' };
        }
        if (bo.approvalObject === 3 && !(bo.candidateGroups as any[])?.length) {
          return { status: false, message: '缺少指定审批角色配置' };
        }
      }
      return { status: true };

    case 'service':
      if (bo?.$type === 'serviceTask') {
        if (bo.type === 'copy') {
          if (!(bo.messageType as any[])?.length) {
            errorMsg.push('缺少消息类型配置');
          }
          if (!(bo.transferTo as any[])?.length) {
            errorMsg.push('缺少抄送人配置');
          }
          if (!bo.messageContent) {
            errorMsg.push('缺少消息内容配置');
          }
        }
        if (bo.type === 'mail') {
          if (!(bo.mailTo as any[])?.length) {
            errorMsg.push('缺少收件人配置');
          }
          if (!bo.subject) {
            errorMsg.push('缺少邮件主题配置');
          }
          if (!bo.mailContent) {
            errorMsg.push('缺少邮件主题配置');
          }
        }

        if (errorMsg.length) {
          return { status: false, message: errorMsg };
        }
      }

      return { status: true };

    default:
      return { status: true };
  }
};

// 删除前的行为
export const defaultPreBehaviorOfDelete: WFPreBehavior = async node => {
  // 条件节点需要操作确认
  if (isExpressionNode(node)) {
    if (node.$parent.$expressions.length <= 2) return modalValidator('确定删除该节点吗？', '当前条件路径数量小于 2 条，删除该节点将同时删除整个网关内容。');
    return modalValidator('确定删除该节点吗？', '删除该条件时将同时移除该路径分支上所有后续节点。');
  }
  // 子流程节点需要操作确认
  if (isSubprocessNode(node)) {
    return modalValidator('确定删除该节点吗？', '删除该子流程时将同时删除内部所有节点。');
  }

  return true;
};

// 全局规则设置
export const globalConfig: WFGlobalConfig = {
  canRemove: defaultRemoveValidator,
  canAppend: defaultAppendValidator,
  canMove: defaultMoveValidator,
  canDropped: defaultDropValidator,
  removeValidator: () => ({ status: true }),
  completenessValidator: defaultCompletenessValidator,
  preBehaviorOfDelete: defaultPreBehaviorOfDelete,
};

export function setWFGlobalConfig<K extends WFGlobalConfigKey>(key: K, configure?: WFGlobalConfig[typeof key]) {
  if (configure) {
    globalConfig[key] = configure;
  }
}

export function getWFGlobalConfig<K extends WFGlobalConfigKey>(key: K): WFGlobalConfig[typeof key] {
  return globalConfig[key];
}
