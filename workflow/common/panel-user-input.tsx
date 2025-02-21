import { NButton, NDrawer, NDrawerContent, NInput, NInputGroup, NSelect, NTag, NTree, TreeOption } from 'naive-ui';
import { IconAlertCircleFilled, IconCircleCheckFilled, IconSearch } from '@tabler/icons-vue';
import { faker } from '@faker-js/faker/locale/zh_CN';

interface IPanelUserInputProps {
  modelValue?: Record<string, unknown>[];
  modelTitle?: string;
  multiple?: boolean;
  rowKey?: string;
  request?: boolean;
  validator?: () => boolean;
}

export default defineComponent<IPanelUserInputProps, { 'update:modelValue': (value: Record<string, unknown>[]) => true; change: (value: Record<string, unknown>[]) => true }>(
  (props, { emit }) => {
    // const validator = computed(() => (props.validator === undefined ? true : props.validator));
    const modalCheckedValues = ref<any[]>([]);
    const drawerVisible = ref<boolean>(false);

    const computedTags = computed<string[]>({
      get: () => {
        if (Array.isArray(toRaw(props.modelValue))) {
          return props.modelValue!.map(i => i.name as string);
        }
        return ['张春华', '长孙', '临江', '哈哈哈哈', '啦啦啦啦'];
      },
      set: names => {
        const newValues = modalCheckedValues.value.filter(i => names.includes(i.name));
        emit('update:modelValue', newValues);
        emit('change', newValues);
      },
    });

    const treeOption = computed<TreeOption[]>(() => {
      const root: TreeOption = {
        key: faker.number.int({ min: 10000, max: 99999 }).toString(),
        label: faker.company.name(),
        children: ['人力资源部', '技术研发部', '财务部', '市场拓展部', '客户服务部', '产品管理部', '研发部', '销售部', '行政部'].map(
          dep =>
            ({
              key: faker.number.int({ min: 10000, max: 99999 }).toString(),
              label: dep,
            }) as TreeOption,
        ),
      };
      return [root];
    });

    return () => (
      <>
        <NInputGroup class="panel-user-input">
          <NSelect
            value={computedTags.value}
            renderTag={({ option }) => h(NTag, { type: 'primary', size: 'small' }, { default: () => option.label })}
            placeholder="请选择人员"
            show={false}
            maxTagCount={3}
            tag
            multiple
          >
            {{
              arrow: () => (computedTags.value ? <IconCircleCheckFilled class="text-success6" size="18" /> : <IconAlertCircleFilled class="text-warning5" size="18" />),
            }}
          </NSelect>
          <NButton class="min-w-14" type="primary" onClick={() => (drawerVisible.value = true)}>
            <IconSearch size={18} />
          </NButton>
        </NInputGroup>
        <NDrawer v-model:show={drawerVisible.value} width="80vw" placement="right">
          <NDrawerContent>
            {{
              header: () => <span class="font-bold">人员选择</span>,
              footer: () => (
                <div class="flex gap-2">
                  <NButton ghost type="primary" size="small" onClick={() => (drawerVisible.value = false)}>
                    取消
                  </NButton>
                  <NButton type="primary" size="small">
                    确定
                  </NButton>
                </div>
              ),
              default: () => (
                <div class="h-full flex flex-col">
                  <div class="h-20 border-b border-rim2"></div>
                  <div class="h-full grid grid-cols-5">
                    <div class="flex flex-col gap-2 p-2">
                      <NInputGroup>
                        <NInput size="small" placeholder="请输入部门名称" />
                        <NButton class="min-w-14" size="small" type="primary">
                          <IconSearch size={18} />
                        </NButton>
                      </NInputGroup>
                      <NTree data={treeOption.value} expandOnClick blockLine />
                    </div>
                    <div class="col-span-4 border-l border-rim2"></div>
                  </div>
                </div>
              ),
            }}
          </NDrawerContent>
        </NDrawer>
      </>
    );
  },
);
