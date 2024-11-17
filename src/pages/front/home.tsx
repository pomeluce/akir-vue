import { NButton, NCard } from 'naive-ui';

export default defineComponent({
  setup() {
    const load = () => {
      const el = useSpin({ content: '加载中...' });

      window.setTimeout(() => {
        el.close();
      }, 2000);
    };

    return () => (
      <NCard class="bg-backdrop2 h-[1000px]" title={() => <header class="flex pb-2 border-b border-rim2">我是标题</header>}>
        <NButton type="info" onClick={load}>
          加载
        </NButton>
      </NCard>
    );
  },
});
