import { NButton } from 'naive-ui';
import { I500 } from '@/components';

export default defineComponent(
  () => {
    const router = useRouter();

    return () => (
      <main class="w-full h-screen flex justify-center items-center">
        <main class="flex flex-col justify-center items-center gap-7 pb-20">
          <span>
            <I500 class="w-56" />
          </span>
          <span class="text-base md:text-3xl font-bold ">啊哦, 网站出了点小意外</span>
          <span>
            <NButton type="error" onClick={() => router.push({ name: RouteName.HOME })}>
              返回首页
            </NButton>
          </span>
        </main>
      </main>
    );
  },
  { name: RouteName.ERROR_500 },
);
