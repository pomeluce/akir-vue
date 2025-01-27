// import PaletteProvider from 'bpmn-js/lib/features/palette/PaletteProvider';

export default class AkirBpmnPalette {
  constructor(palette, create, elementFactory, bpmnFactory, translate) {
    this.create = create;
    this.elementFactory = elementFactory;
    this.bpmnFactory = bpmnFactory;
    this.translate = translate;
    palette.registerProvider(this);
  }

  getPaletteEntries() {}
}

AkirBpmnPalette.$inject = ['palette', 'create', 'elementFactory', 'bpmnFactory', 'translate'];
