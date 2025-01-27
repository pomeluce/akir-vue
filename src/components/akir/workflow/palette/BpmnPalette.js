import translate from '../lang/translate';

export default class AkirBpmnPalette {
  constructor(palette, create, elementFactory, bpmnFactory, translate) {
    this.create = create;
    this.elementFactory = elementFactory;
    this.bpmnFactory = bpmnFactory;
    this.translate = translate;
    palette.registerProvider(this);
  }

  getPaletteEntries() {
    return {
      'create.lindaidai-task': {
        group: 'model', // 分组名
        className: 'bpmn-icon-task red', // 样式类名
        title: translate('创建一个类型为lindaidai-task的任务节点'),
        action: {
          // 操作
          dragstart: createTask(), // 开始拖拽时调用的事件
          click: createTask(), // 点击时调用的事件
        },
      },
    };
  }
}

AkirBpmnPalette.$inject = ['palette', 'create', 'elementFactory', 'bpmnFactory', 'translate'];
