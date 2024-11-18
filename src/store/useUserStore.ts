import { current, menuList } from '@/request/user';

const { isAuthenticated } = useAuth();

export default defineStore('user', () => {
  const user = ref<UserModel>({} as UserModel);
  const role = ref<string>('');
  const menus = ref<MenuModel[]>([]);

  const isAdministrator = computed(() => role.value === 'admin');

  function setUser(data: UserModel) {
    user.value = data;
  }

  async function getCurrentUser() {
    if (isAuthenticated()) {
      const { data, body } = await current();
      user.value = data;
      role.value = body.role;
    }
  }

  async function getMenuList() {
    if (isAuthenticated()) {
      const { data } = await menuList();
      menus.value = data;
    }
  }

  return { user, role, isAdministrator, setUser, getCurrentUser, getMenuList };
});
