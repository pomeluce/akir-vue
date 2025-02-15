import { RiArrowLeftDoubleLine } from '@remixicon/vue';
import { isUndefined } from 'lodash-es';
import { NIcon } from 'naive-ui';
import { PropType } from 'vue';

const props = { node: { type: Object as PropType<WFBaseNode>, default: () => ({ businessData: {} }) } };

export default defineComponent({
  props,
  setup(props) {
    const panelState = ref<boolean>(false);

    const { t } = useI18n();

    const headerTitle = computed(() => {
      if (props.node.businessData?.$type) return t(props.node.businessData?.$type);
      return props.node.type ? t(props.node.type) : 'Process';
    });

    const togglePanel = (state?: boolean) => {
      if (!props.node.id) return (panelState.value = false);
      if (isUndefined(state)) return (panelState.value = !panelState.value);
      panelState.value = state;
    };

    return () => (
      <div class={{ 'akir-panel': true, opened: panelState.value }}>
        <div class="toggle-btn" onClick={() => togglePanel()}>
          <NIcon>
            <RiArrowLeftDoubleLine />
          </NIcon>
        </div>

        <div class="akir-panel_header">{headerTitle.value}</div>
      </div>
    );
  },
});
