import { NCard } from 'naive-ui';
import { ComponentInstance } from 'vue';
import { AkirDesigner, AkirDesignerExpose } from 'wf/index';
import { createPresetProcess } from 'wf/utils';

export default defineComponent<{}>(() => {
  const direction = ref<WFDirection>('vertical');
  const processData = ref<WFEventNode>(createPresetProcess());
  const designerRef = shallowRef<ComponentInstance<typeof AkirDesigner> & AkirDesignerExpose>();

  const zoomCenter = () => designerRef.value?.fitViewport();

  onMounted(() => {
    zoomCenter();
  });

  return () => (
    <NCard>
      <AkirDesigner ref={designerRef} v-model={processData.value} direction={direction.value} />
    </NCard>
  );
});
