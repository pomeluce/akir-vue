import { NCard, NDataTable, NTree } from 'naive-ui';

export default defineComponent({
  name: RouteName.SYSTEM_MENU,
  setup() {
    return () => (
      <NCard>
        <div class="h-full grid grid-cols-4">
          <nav>
            <NTree data={[]} expandOnClick blockLine />
          </nav>
          <main class="col-span-3">
            <NDataTable />
          </main>
        </div>
      </NCard>
    );
  },
});
