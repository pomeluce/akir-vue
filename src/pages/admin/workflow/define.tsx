import { NButton, NCard, NInput, NSelect, NStep, NSteps } from 'naive-ui';
import { IconChevronLeft } from '@tabler/icons-vue';
import { SystemForm, SystemFormItem } from '@/components';

export default defineComponent<{}>(
  () => {
    const router = useRouter();
    const current = ref<number>(1);

    return () => (
      <NCard>
        <div class="flex flex-col items-center gap-5">
          <header class="w-full h-16 bg-backdrop2 sticky top-0 z-10 flex justify-between items-center gap-3 px-5 py-7 border-b border-rim2">
            <div>
              <NButton class="size-8! p-0!" secondary onClick={() => router.back()}>
                <IconChevronLeft size={18} />
              </NButton>
            </div>
            <NSteps class="w-1/2!" v-model={[current.value, 'current']} size="small">
              <NStep title="基础信息" />
              <NStep title="流程设计" />
              <NStep class="flex-none!" title="更多设置" />
            </NSteps>
            <div>
              <NButton type="primary" size="small" disabled>
                发布
              </NButton>
            </div>
          </header>
          <div class="max-w-page bg-backdrop3 p-10 border border-rim2 rounded">
            <SystemForm>
              <div class="grid grid-cols-3 gap-x-5 gap-y-10 box-border">
                <SystemFormItem label="流程名称" required>
                  <NInput />
                </SystemFormItem>
                <SystemFormItem label="流程编码" required>
                  <NInput />
                </SystemFormItem>
                <SystemFormItem label="流程版本" required>
                  <NInput />
                </SystemFormItem>
                <SystemFormItem label="页面路由" required>
                  <NInput />
                </SystemFormItem>
                <SystemFormItem class="col-span-2" label="流程处理器" required>
                  <NInput />
                </SystemFormItem>
                <SystemFormItem label="分组">
                  <NSelect options={[]} />
                </SystemFormItem>
                <SystemFormItem class="col-span-3" label="流程描述">
                  <NInput type="textarea" rows={5} resizable={false} />
                </SystemFormItem>
                <div class="col-span-3 justify-self-end">
                  <NButton type="primary" onClick={() => (current.value = 2)}>
                    下一步
                  </NButton>
                </div>
              </div>
            </SystemForm>
          </div>
        </div>
      </NCard>
    );
  },
  { name: RouteName.WORKFLOW_DEFINE },
);
