import { IconCircleDotted, IconMail, IconParking, IconRouteAltLeft, IconSend, IconSitemap, IconUserCog } from '@tabler/icons-vue';

export const defaultWFAppendMenuProvider: WFAppendMenuProvider<WFBaseNodeType> = () => {
  return [
    {
      type: 'task',
      name: '用户任务',
      businessData: { $type: 'userTask' },
      icon: IconUserCog,
    },
    {
      type: 'service',
      name: '抄送任务',
      businessData: { $type: 'serviceTask', type: 'copy', cls: 'copy-service' },
      icon: IconSend,
    },
    {
      type: 'service',
      name: '邮件任务',
      businessData: { $type: 'serviceTask', type: 'mail', cls: 'mail-service' },
      icon: IconMail,
    },
    {
      type: 'event',
      name: '异常事件',
      businessData: { $type: 'intermediateThrowEvent' },
      icon: IconCircleDotted,
    },
    {
      type: 'gateway',
      name: '互斥网关',
      businessData: { $type: 'exclusiveGateway' },
      icon: IconRouteAltLeft,
      iconStyle: { transform: 'rotate(180deg)' },
    },
    {
      type: 'gateway',
      name: '并行网关',
      businessData: { $type: 'parallelGateway' },
      icon: IconSitemap,
    },
    {
      type: 'subprocess',
      name: '子流程',
      businessData: { $type: 'subProcess' },
      icon: IconParking,
    },
  ];
};
