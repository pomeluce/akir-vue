import { DataTableColumns, DataTableRowKey, NButton, NDataTable, NDrawer, NDrawerContent, NInput, NInputGroup, NSplit, NTag, NTree, TreeOption } from 'naive-ui';
import { IconSearch } from '@tabler/icons-vue';
import { AkirPanelTagInput } from '.';
import { faker } from '@faker-js/faker/locale/zh_CN';
import { userList } from '@/request/user';

interface IPanelUserInputProps {
  modelValue?: UserModel[];
  modelTitle?: string;
  multiple?: boolean;
  validator?: () => boolean;
}

export default defineComponent<IPanelUserInputProps, { 'update:modelValue': (value: UserModel[]) => true; change: (value: UserModel[]) => true }>(
  (props, { emit }) => {
    const multiple = computed(() => props.multiple || true);
    const modalCheckedValues = ref<UserModel[]>(props.modelValue || []);
    const drawerVisible = ref<boolean>(false);
    const users = ref<(UserModel & { key: DataTableRowKey })[]>();

    const computedTags = ref<string[]>(props.modelValue?.map(v => v.username) || []);

    const treeOption = computed<TreeOption[]>(() => {
      const root: TreeOption = {
        key: 'tree-root-key',
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

    const handleCheckedRowKeys = (keys: DataTableRowKey[]) => {
      modalCheckedValues.value = users.value!.filter(i => keys.includes(i.key));
    };

    const handleTagClose = (id: string) => {
      modalCheckedValues.value = modalCheckedValues.value.filter(v => v.id !== id);
    };

    const handleConfirm = () => {
      drawerVisible.value = false;
      computedTags.value = modalCheckedValues.value.map(v => v.username);
      emit('update:modelValue', modalCheckedValues.value);
      emit('change', modalCheckedValues.value);
    };

    const columns: DataTableColumns<UserModel> = [
      { type: 'selection', multiple: multiple.value },
      { key: 'account', title: '账号' },
      { key: 'username', title: '姓名' },
      { key: 'email', title: '邮箱' },
      { key: 'phone', title: '手机' },
      { key: 'gender', title: '性别' },
      { key: 'status', title: '状态' },
      { key: 'createTime', title: '创建时间' },
      { key: 'updateTime', title: '更新时间' },
    ];

    onBeforeMount(async () => {
      const result = await userList(150);
      users.value = result.data.map(user => ({ key: user.id, ...user }));
    });

    return () => (
      <>
        <NInputGroup>
          <AkirPanelTagInput modelValue={computedTags.value} maxTagCount={3} placeholder="请选择人员" editable={false} validator={props.validator} />
          <NButton class="min-w-14" type="primary" onClick={() => (drawerVisible.value = true)}>
            <IconSearch size={18} />
          </NButton>
        </NInputGroup>
        <NDrawer v-model:show={drawerVisible.value} width="80vw" placement="right">
          <NDrawerContent>
            {{
              header: () => <span class="font-bold">{props.modelTitle || '人员选择'}</span>,
              footer: () => (
                <div class="flex gap-2">
                  <NButton ghost type="primary" size="small" onClick={() => (drawerVisible.value = false)}>
                    取消
                  </NButton>
                  <NButton type="primary" size="small" onClick={handleConfirm}>
                    确定
                  </NButton>
                </div>
              ),
              default: () => (
                <NSplit class="h-full" direction="vertical" resizeTriggerSize={1} defaultSize={0.1} pane1Style={{ overflowY: 'scroll' }} pane2Style={{ overflowY: 'scroll' }}>
                  {{
                    1: () => (
                      <div class="flex gap-2 flex-wrap overflow-y-scroll">
                        {modalCheckedValues.value.map(value => (
                          <NTag key={value.id} type="primary" closable onClose={() => handleTagClose(value.id)}>
                            {value.username}
                          </NTag>
                        ))}
                      </div>
                    ),
                    2: () => (
                      <NSplit class="py-2" direction="horizontal" resizeTriggerSize={1} defaultSize={0.2} min={0.2} max={0.3} pane2Style={{ overflowY: 'scroll' }}>
                        {{
                          1: () => (
                            <div class="flex flex-col gap-2 p-4">
                              <NInputGroup>
                                <NInput size="small" placeholder="请输入部门名称" />
                                <NButton class="min-w-14" size="small" type="primary">
                                  <IconSearch size={18} />
                                </NButton>
                              </NInputGroup>
                              <NTree data={treeOption.value} expandOnClick blockLine defaultExpandedKeys={['tree-root-key']} />
                            </div>
                          ),
                          2: () => (
                            <div class="flex flex-col gap-2 p-4">
                              <NInputGroup class="sticky top-0 z-10">
                                <NInput size="small" placeholder="请输入你的工号、手机、姓名" />
                                <NButton class="min-w-14" size="small" type="primary">
                                  <IconSearch size={18} />
                                </NButton>
                              </NInputGroup>
                              <NDataTable
                                checkedRowKeys={modalCheckedValues.value.map(val => val.id)}
                                columns={columns}
                                data={users.value}
                                bordered
                                pagination={{ pageSize: 14 }}
                                onUpdateCheckedRowKeys={handleCheckedRowKeys}
                              />
                            </div>
                          ),
                        }}
                      </NSplit>
                    ),
                  }}
                </NSplit>
              ),
            }}
          </NDrawerContent>
        </NDrawer>
      </>
    );
  },
  { name: 'PanelUserInput', props: ['modelValue', 'modelTitle', 'multiple', 'validator'] },
);
