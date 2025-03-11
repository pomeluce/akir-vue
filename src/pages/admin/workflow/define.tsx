import { NButton, NCard, NFormItem, NInput, NStep, NSteps } from 'naive-ui';
import { IconChevronLeft } from '@tabler/icons-vue';
import { SystemFormInput } from '@/components';

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
          <div class="border border-rim2 rounded">
            <form>
              <div class="flex flex-col gap-5 p-5">
                <SystemFormInput label="流程名称" />
                <SystemFormInput label="流程编码111" />
                <NFormItem labelPlacement="left" showFeedback={false} label="路由">
                  <NInput />
                </NFormItem>
              </div>
            </form>
          </div>
        </div>
      </NCard>
    );
  },
  { name: RouteName.WORKFLOW_DEFINE },
);
