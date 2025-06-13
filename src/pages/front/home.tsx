import { NCard } from 'naive-ui';

export default defineComponent<{}>(() => {
  return () => (
    <main>
      <NCard class="h-[1100px]" segmented={{ content: true }} title="首页"></NCard>
    </main>
  );
});
