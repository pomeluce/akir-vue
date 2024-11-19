import { NButton } from 'naive-ui';
import { I404 } from '@/components';

export default defineComponent({
  name: RouteName.ERROR_404,
  setup() {
    const router = useRouter();

    return () => (
      <main class="w-full h-screen flex justify-center items-center">
        <main class="flex flex-col justify-center items-center gap-7 pb-20">
          <span>
            <I404 class="w-56" />
          </span>
          <span class="text-base md:text-3xl font-bold ">抱歉, 访问的资源不存在</span>
          <span>
            <NButton type="primary" onClick={() => router.push({ name: RouteName.HOME })}>
              返回首页
            </NButton>
          </span>
        </main>
      </main>
    );
  },
});
