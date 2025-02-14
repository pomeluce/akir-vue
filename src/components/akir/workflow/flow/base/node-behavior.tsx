import { getDragData } from '@/utils/workflow';
import { isFunction } from 'lodash-es';
import { getWFGlobalConfig } from '../../configuration/global';
import { RiAddCircleFill } from '@remixicon/vue';
import { NButton, NPopover } from 'naive-ui';
import { WFAppMenuGetter } from '../../injection';

defineOptions({ name: 'AkirNodeBehavior' });

const props = defineProps<{ data: WFBaseNode }>();
const emit = defineEmits<{ append: [type: WFAppendMenuItem<WFBaseNodeType>]; dropped: [type: Ref<WFBaseNode>] }>();

const droppable = ref<boolean>(false);
const dropin = ref<boolean>(false);
const nodeRef = ref<HTMLDivElement>();

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

export default () => (
  <div class="flow-node__behavior">
    <NPopover>
      {{
        trigger: () => (
          <div
            ref={nodeRef}
            class={{ 'flow-node__behavior-btn': dropin.value && droppable.value, 'flow-node__dropable': dropin.value && !droppable.value }}
            onDrop={dropHandler}
            onClick={e => e.stopPropagation()}
            onDblclick={e => e.stopPropagation()}
          >
            <RiAddCircleFill />
          </div>
        ),

        default: () => (
          <div>
            <span class="node-behavior__header">添加节点</span>
            <div class="node-behavior__btn-grid">
              {appendMenus.value.map((menu, index) => (
                <button key={index}>
                  {menu.icon && (
                    <NButton type="primary" circle>
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
