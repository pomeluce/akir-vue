import { current } from '@/request/user';

const { isAuthenticated } = useAuth();

export default defineStore('user', () => {
  const user = ref<UserModel>({} as UserModel);
  const role = ref<string>('');

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

  return { user, role, isAdministrator, setUser, getCurrentUser };
});
