import { NButton, NCard, NStep, NSteps } from 'naive-ui';
import { IconChevronLeft } from '@tabler/icons-vue';
import { CSSProperties } from 'vue';

export default defineComponent<{}>(() => {
  const router = useRouter();
  const current = ref<number>(1);

  return () => (
    <div class="w-screen h-screen flex flex-col gap-2 items-center">
      <header class="w-full h-16 bg-backdrop2 sticky top-0 z-10 flex justify-between items-center gap-3 px-5 py-7">
        <div>
          <NButton size="small" secondary onClick={() => router.back()}>
            <IconChevronLeft />
          </NButton>
        </div>
        <NSteps class="!w-1/2" v-model={[current.value, 'current']} size="small">
          <NStep title="基础信息" />
          <NStep title="流程设计" />
          <NStep class="!flex-none" title="更多设置" />
        </NSteps>
        <div>
          <NButton type="primary" size="small" disabled>
            发布
          </NButton>
        </div>
      </header>
      <main class="flex-1 2xl:w-page">
        <NCard style={{ height: '100%' } as CSSProperties}></NCard>
      </main>
    </div>
  );
});
