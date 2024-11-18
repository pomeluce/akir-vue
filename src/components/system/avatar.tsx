import { avatarMenus } from '@/configs/menus';
import { NAvatar, NButton, NDivider, NPopover } from 'naive-ui';

export default defineComponent({
  setup() {
    const store = useUserStore();
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    return () => (
      <>
        {isAuthenticated() ? (
          <NPopover showArrow={false} placement="bottom" trigger="hover">
            {{
              trigger: () => (
                <div class="flex justify-center items-center cursor-pointer">
                  <NAvatar size="small" round src={store.user.avatar} />
                  <NDivider vertical />
                  <span class="text-lg font-semibold">{store.user.name}</span>
                </div>
              ),
              default: () => (
                <div class="flex flex-col justify-center items-center gap-3 cursor-pointer">
                  {avatarMenus.map(item => (
                    <div key={item.key} class="flex justify-center items-center gap-2" onClick={item.onClick}>
                      {h(item.icon, { size: '18' })}
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              ),
            }}
          </NPopover>
        ) : (
          <div class="flex justify-center items-center gap-2">
            <NButton type="primary" size="small" onClick={() => router.push({ name: RouteName.LOGIN })}>
              登 录
            </NButton>
            <NButton type="info" ghost size="small" onClick={() => router.push({ name: RouteName.REGISTER })}>
              注 册
            </NButton>
          </div>
        )}
      </>
    );
  },
});
