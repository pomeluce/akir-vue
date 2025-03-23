import { NAvatar, NButton, NDivider, NPopover } from 'naive-ui';
import { avatarMenus } from '@/configs/menus';

export default defineComponent<{}>(() => {
  const store = useUserStore();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  return () => (
    <>
      {isAuthenticated() ? (
        <NPopover showArrow={false} placement="bottom" trigger="hover" class="p-1!">
          {{
            trigger: () => (
              <div class="flex justify-center items-center cursor-pointer">
                <NAvatar size="small" round src={store.user.avatar || '/src/assets/images/avatar.png'} />
                <NDivider class="bg-fill4!" vertical />
                <span class="font-medium">{store.user.username}</span>
              </div>
            ),
            default: () => (
              <div class="flex flex-col justify-center items-center cursor-pointer">
                {avatarMenus.map(item => (
                  <div key={item.key} class="px-3 py-2 flex justify-center items-center gap-2 rounded hover:bg-fill2 dark:hover:bg-fill4" onClick={item.onClick}>
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
});
