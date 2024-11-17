import { NButton } from 'naive-ui';
import { I403 } from '@/components';

export default defineComponent({
  setup() {
    const router = useRouter();

    return () => (
      <main class="h-screen flex justify-center items-center">
        <main class="flex flex-col justify-center items-center gap-7 pb-20">
          <span>
            <I403 class="w-56" />
          </span>
          <span class="text-base md:text-3xl font-bold ">当前资源需要授权访问哦!</span>
          <span>
            <NButton type="warning" onClick={() => router.push({ name: RouteName.HOME })}>
              返回首页
            </NButton>
          </span>
        </main>
      </main>
    );
  },
});
