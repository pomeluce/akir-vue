import LoginBg from '@/assets/images/login-bg.svg';
import { NButton, NCheckbox, NIcon, NInput, NInputGroup } from 'naive-ui';
import { SystemIllustration } from '@/components';
import { ErrorLabel, Footer } from './route';
import { captcha, login } from '@/request/auth';
import { loginValidate } from '@/configs/auth';
import { SubmissionHandler } from 'vee-validate';
import { IconIdBadge2, IconLock, IconUserCircle } from '@tabler/icons-vue';

export default defineComponent<{}>(() => {
  const image = ref<string>('');
  const uid = ref<string>('');

  const getCaptcha = async () => {
    const { data } = await captcha<CaptchaModel>('MATH');
    image.value = data.image;
    uid.value = data.uid;
  };

  const { model, attrs, handleSubmit, errors } = loginValidate();

  const submissionHandle: SubmissionHandler<LoginFormModel> = data => login({ ...data, uid: uid.value });

  onBeforeMount(getCaptcha);

  return () => (
    <form class="min-w-xs max-w-2/3 md:max-w-none flex-1 flex justify-center" onSubmit={handleSubmit(submissionHandle)}>
      <div class="md:w-[720px] md:grid grid-cols-2 rounded shadow-evenly overflow-hidden bg-backdrop2 p-5">
        <div class="hidden md:block py-5">
          <main class="h-full flex justify-center items-center border-r border-rim2">
            <SystemIllustration src={LoginBg} />
          </main>
        </div>
        <div class="flex flex-col justify-between box-border p-5">
          <div>
            <h2 class="text-center text-word2 text-lg font-bold uppercase mt-3">akir-vue</h2>
            <div class="mt-8 flex flex-col">
              <NInput placeholder="请输入用户名" v-model={[model.account.value, 'value']} {...attrs.account.value}>
                {{
                  prefix: () => <NIcon component={<IconUserCircle />} />,
                }}
              </NInput>
              <ErrorLabel message={errors.value?.account} />
              <NInput placeholder="请输入登录密码" type="password" v-model={[model.password.value, 'value']} {...attrs.password.value}>
                {{
                  prefix: () => <NIcon component={<IconLock />} />,
                }}
              </NInput>
              <ErrorLabel message={errors.value?.password} />
              <NInputGroup class="gap-3">
                <NInput type="text" placeholder="请输入验证码" v-model={[model.captcha.value, 'value']} {...attrs.captcha.value}>
                  {{
                    prefix: () => <NIcon component={<IconIdBadge2 />} />,
                  }}
                </NInput>
                <img class="h-9 box-border border border-rim3 rounded" src={image.value} onClick={getCaptcha} />
              </NInputGroup>
              <ErrorLabel message={errors.value?.captcha} />
            </div>
            <div class="flex justify-between mt-1">
              <span class="flex items-center gap-1">
                <NCheckbox>记住我</NCheckbox>
              </span>
              <NButton text>忘记密码</NButton>
            </div>
            <NButton class="w-full! mt-2!" size="large" type="primary" attrType="submit">
              登录
            </NButton>
            <Footer />
          </div>
        </div>
      </div>
    </form>
  );
});
