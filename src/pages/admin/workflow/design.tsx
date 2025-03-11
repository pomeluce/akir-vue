import { DataTableColumns, NButton, NCard, NDataTable, NForm, NFormItem, NInput, NSpace, NTag } from 'naive-ui';
import { IconCirclePlus, IconCopy, IconForbid, IconPencilMinus, IconTrash, IconTrashX } from '@tabler/icons-vue';

const columns: DataTableColumns = [
  { type: 'selection' },
  { key: 'code', title: '编码' },
  { key: 'name', title: '名称' },
  {
    key: 'version',
    title: '版本',
    render: row => (
      <NTag size="small" type="primary" bordered={false}>
        v{row.version}
      </NTag>
    ),
  },
  { key: 'createTime', title: '创建时间' },
  { key: 'updateTime', title: '更新时间' },
  {
    key: 'actions',
    title: '操作',
    render: row => (
      <div class="inline-flex items-center gap-2">
        <NButton size="small" text onClick={() => console.log(row.id)}>
          <IconPencilMinus size="16" />
        </NButton>
        <NButton size="small" text>
          <IconCopy size="16" />
        </NButton>
        <NButton size="small" text>
          <IconForbid size="16" />
        </NButton>
        <NButton size="small" text>
          <IconTrash size="16" />
        </NButton>
      </div>
    ),
  },
];

export default defineComponent<{}>(
  () => {
    const data = [
      {
        key: 100001,
        id: 100001,
        code: 'travel-process',
        name: '差旅流程',
        version: '1',
        createTime: '2022-01-01',
        updateTime: '2022-01-01',
      },
    ];
    const router = useRouter();

    const handleAddClick = () => router.push({ name: RouteName.WORKFLOW_DEFINE });

    return () => (
      <div class="flex flex-col gap-3">
        <NCard>
          <NForm labelPlacement="left" showFeedback={false}>
            <div class="grid grid-cols-4 gap-4">
              <NFormItem class="col-span-1" label="流程编码:">
                <NInput />
              </NFormItem>
              <NFormItem class="col-span-1" label="流程名称:">
                <NInput />
              </NFormItem>
              <NFormItem class="col-span-1" label="流程版本:">
                <NInput />
              </NFormItem>
              <NSpace align="center" justify="end">
                <NButton type="primary" size="small">
                  查询
                </NButton>
                <NButton size="small">清除</NButton>
              </NSpace>
            </div>
          </NForm>
        </NCard>
        <NCard class="flex-1">
          {{
            header: () => (
              <div class="flex gap-3">
                <NButton size="small" type="primary" renderIcon={() => <IconCirclePlus size="14" />} onClick={handleAddClick}>
                  新增
                </NButton>
                <NButton size="small" type="error" renderIcon={() => <IconTrashX size="14" />}>
                  删除
                </NButton>
              </div>
            ),
            default: () => <NDataTable columns={columns} data={data} />,
          }}
        </NCard>
      </div>
    );
  },
  { name: RouteName.WORKFLOW_DESIGN },
);
