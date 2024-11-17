import { RiLogoutCircleRLine, RiSettingsLine, RiUser3Line } from '@remixicon/vue';
import { NAvatar, NButton, NDivider, NDropdown } from 'naive-ui';

export default defineComponent({
  setup() {
    const { user } = useUserStore();
    const { isAuthenticated } = useAuth();
    const size = '18';
    const router = useRouter();

    return () => (
      <>
        {isAuthenticated() ? (
          <NDropdown
            options={[
              {
                key: 'user',
                label: '个人中心',
                icon: () => <RiUser3Line size={size} />,
              },
              {
                key: 'detail',
                label: '用户设置',
                icon: () => <RiSettingsLine size={size} />,
              },
              {
                key: 'logout',
                label: '退出登录',
                icon: () => <RiLogoutCircleRLine size={size} />,
              },
            ]}
          >
            <div class="flex justify-center items-center">
              <NAvatar size="small" round src={user.avatar} />
              <NDivider vertical />
              <span class="text-lg">{user.name}</span>
            </div>
          </NDropdown>
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
