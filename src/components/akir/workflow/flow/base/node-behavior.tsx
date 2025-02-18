import { getDragData } from '@/utils/workflow';
import { isFunction } from 'lodash-es';
import { getWFGlobalConfig } from '../../configuration/global';
import { NButton, NPopover } from 'naive-ui';
import { WFAppMenuGetter } from '../../injection';
import { IconCirclePlusFilled } from '@tabler/icons-vue';

const props = { data: Object as PropType<WFBaseNode> };

export default defineComponent({
  name: 'AkirNodeBehavior',
  props,
  emits: ['append', 'dropped'],
  setup(props, { emit }) {
    const droppable = ref<boolean>(false);
    const dropin = ref<boolean>(false);
    const nodeRef = ref<HTMLDivElement>();
    const visible = ref<boolean>(false);

    const appendMenuGetterFc = inject(WFAppMenuGetter);

    const appendMenus = computed(() => {
      if (!appendMenuGetterFc) return [];
      return appendMenuGetterFc?.(props.data) || [];
    });

    const validateDrop = () => {
      if (!getDragData()) return false;

      const canDropped = getWFGlobalConfig('canDropped');

      if (isFunction(canDropped)) return canDropped(props.data, getDragData()?.value);

      return canDropped;
    };

    const clickHandler = (e: MouseEvent, menu: WFAppendMenuItem<WFBaseNodeType>) => {
      e.stopPropagation();
      emit('append', menu);
      visible.value = false;
    };

    const dropHandler = (e: DragEvent) => {
      e.stopPropagation();
      e.preventDefault();
      dropin.value = false;
      const node = getDragData();
      if (node && validateDrop()) emit('dropped', node);
    };

    const toggleDroppableState = (e: DragEvent, state: boolean) => {
      e.stopPropagation();
      e.preventDefault();
      dropin.value = state;
      droppable.value = validateDrop();
    };

    onMounted(() => {
      nodeRef.value?.addEventListener('dragover', e => toggleDroppableState(e, true), { capture: true });
      nodeRef.value?.addEventListener('dragleave', e => toggleDroppableState(e, false), { capture: true });
    });

    onBeforeUnmount(() => {
      nodeRef.value?.removeEventListener('dragover', e => toggleDroppableState(e, true), { capture: true });
      nodeRef.value?.removeEventListener('dragleave', e => toggleDroppableState(e, false), { capture: true });
    });
    return () => (
      <div class="flow-node__behavior">
        <NPopover
          class="!bg-backdrop2"
          showArrow={false}
          show={visible.value}
          trigger="click"
          placement="bottom-start"
          onClickoutside={() => (visible.value = false)}
        >
          {{
            trigger: () => (
              <div
                ref={nodeRef}
                class={{
                  'flow-node__behavior-btn': true,
                  'flow-node__droppable': dropin.value && droppable.value,
                  'flow-node__not-droppable': dropin.value && !droppable.value,
                }}
                onDrop={dropHandler}
                onClick={e => {
                  e.stopPropagation();
                  visible.value = true;
                }}
                onDblclick={e => e.stopPropagation()}
              >
                <IconCirclePlusFilled size="32" />
              </div>
            ),

            default: () => (
              <div>
                <span class="node-behavior__header">添加节点</span>
                <div class="node-behavior__btn-grid">
                  {appendMenus.value.map((menu, index) => (
                    <button key={index} class="node-behavior__btn" onClick={e => clickHandler(e, menu)}>
                      {menu.icon && (
                        <NButton type="primary" circle size="small">
                          {h(menu.icon, { size: 16, style: menu.iconStyle })}
                        </NButton>
                      )}
                      <span class="node-behavior__btn-text">{menu.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            ),
          }}
        </NPopover>
      </div>
    );
  },
});
