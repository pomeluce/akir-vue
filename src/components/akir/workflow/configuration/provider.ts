import { RiDonutChartLine, RiMailLine, RiParkingBoxLine, RiSendPlaneLine, RiStackshareLine, RiStockLine, RiUserSettingsLine } from '@remixicon/vue';

export const defaultWFAppendMenuProvider: WFAppendMenuProvider<WFBaseNodeType> = () => {
  return [
    {
      type: 'task',
      name: '用户任务',
      businessData: { $type: 'userTask' },
      icon: RiUserSettingsLine,
    },
    {
      type: 'service',
      name: '抄送任务',
      businessData: { $type: 'serviceTask', type: 'copy', cls: 'copy-service' },
      icon: RiSendPlaneLine,
    },
    {
      type: 'service',
      name: '邮件任务',
      businessData: { $type: 'serviceTask', type: 'mail', cls: 'mail-service' },
      icon: RiMailLine,
    },
    {
      type: 'event',
      name: '异常事件',
      businessData: { $type: 'intermediateThrowEvent' },
      icon: RiDonutChartLine,
    },
    {
      type: 'gateway',
      name: '互斥网关',
      businessData: { $type: 'exclusiveGateway' },
      icon: RiStockLine,
    },
    {
      type: 'gateway',
      name: '并行网关',
      businessData: { $type: 'parallelGateway' },
      icon: RiStackshareLine,
      iconStyle: { transform: 'rotate(180deg)' },
    },
    {
      type: 'subprocess',
      name: '子流程',
      businessData: { $type: 'subProcess' },
      icon: RiParkingBoxLine,
    },
  ];
};
