import { NButton, NCard } from 'naive-ui';

export default defineComponent<{}>(() => {
  const load = () => {
    const el = useSpin({ content: '加载中...' });

    window.setTimeout(() => {
      el.close();
    }, 2000);
  };

  return () => (
    <main>
      <NCard class="h-[1000px]" segmented={{ content: true }} title="首页">
        <NButton type="info" onClick={load}>
          加载
        </NButton>
      </NCard>
    </main>
  );
});
