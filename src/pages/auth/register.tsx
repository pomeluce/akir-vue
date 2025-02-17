import RegisterBg from '@/assets/images/register-bg.svg';
import { NButton, NIcon, NInput, NInputGroup, NTag } from 'naive-ui';
import { Illustration } from '@/components';
import { Footer } from './route';
import { captcha } from '@/request/auth';
import { registerValidate } from '@/configs/auth';
import { SubmissionHandler } from 'vee-validate';
import { IconAlertCircleFilled, IconIdBadge2, IconLock, IconUserCircle } from '@tabler/icons-vue';

export default defineComponent({
  setup() {
    const image = ref<string>('');
    const uid = ref<string>('');

    const getCaptcha = async () => {
      const { data } = await captcha<CaptchaModel>();
      image.value = `data:image/png;base64,${data.image}`;
      uid.value = data.uid;
    };

    const { model, handleSubmit, errors } = registerValidate();

    const submissionHandle: SubmissionHandler<LoginFormModel> = data => console.log(data);

    onBeforeMount(getCaptcha);

    return () => (
      <form class="min-w-xs max-w-2/3 md:max-w-none flex-1 flex justify-center" onSubmit={handleSubmit(submissionHandle)}>
        <div class="md:w-[720px] md:grid grid-cols-2 rounded-xl shadow-lg overflow-hidden bg-backdrop2 p-5">
          <div class="hidden md:block py-5">
            <main class="h-full flex justify-center items-center border-r border-rim2">
              <Illustration src={RegisterBg} />
            </main>
          </div>
          <div class="flex flex-col justify-between box-border p-5">
            <div>
              <h2 class="text-center text-word2 text-lg font-bold uppercase mt-3">akir-vue</h2>

              <div class="mt-8 flex flex-col gap-4">
                <NInput placeholder="请输入用户名、邮箱或手机号" v-model={[model.username.value, 'value']}>
                  {{
                    prefix: () => <NIcon component={<IconUserCircle />} />,
                  }}
                </NInput>
                {errors.value?.username && (
                  <NTag type="error">
                    {{
                      icon: () => <NIcon component={<IconAlertCircleFilled />} />,
                      default: () => <span class="text-xs">{errors.value?.username}</span>,
                    }}
                  </NTag>
                )}

                <NInput placeholder="请输入登录密码" type="password" v-model={[model.password.value, 'value']}>
                  {{
                    prefix: () => <NIcon component={<IconLock />} />,
                  }}
                </NInput>
                {errors.value?.password && (
                  <NTag type="error">
                    {{
                      icon: () => <NIcon component={<IconAlertCircleFilled />} />,
                      default: () => <span class="text-xs">{errors.value?.password}</span>,
                    }}
                  </NTag>
                )}

                <NInput placeholder="请再次输入密码" type="password" v-model={[model.confirm.value, 'value']}>
                  {{
                    prefix: () => <NIcon component={<IconLock />} />,
                  }}
                </NInput>
                {errors.value?.confirm && (
                  <NTag type="error">
                    {{
                      icon: () => <NIcon component={<IconAlertCircleFilled />} />,
                      default: () => <span class="text-xs">{errors.value?.confirm}</span>,
                    }}
                  </NTag>
                )}

                <NInputGroup class="gap-3">
                  <NInput type="text" placeholder="请输入验证码" v-model={[model.captcha.value, 'value']}>
                    {{
                      prefix: () => <NIcon component={<IconIdBadge2 />} />,
                    }}
                  </NInput>
                  <img class="h-9" src={image.value} onClick={getCaptcha} />
                </NInputGroup>
                {errors.value?.captcha && (
                  <NTag type="error">
                    {{
                      icon: () => <NIcon component={<IconAlertCircleFilled />} />,
                      default: () => <span class="text-xs">{errors.value?.captcha}</span>,
                    }}
                  </NTag>
                )}
              </div>
              <NButton class="w-full mt-5" size="large" type="primary" attrType="submit">
                注册
              </NButton>
              <Footer />
            </div>
          </div>
        </div>
      </form>
    );
  },
});
