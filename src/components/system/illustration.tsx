import cricle from '@/assets/images/cricle.svg';
import triangle from '@/assets/images/triangle.svg';

export default defineComponent({
  props: {
    src: String,
  },
  setup({ src }) {
    return () => (
      <div class="w-40 h-40 relative flex justify-center items-center rounded-full bg-fill2 dark:bg-fill4">
        <span class="absolute top-0 left-0 w-4 h-4">
          <img src={cricle} alt="" />
        </span>
        <span class="absolute -left-3 bottom-3 w-4 h-4">
          <img src={triangle} alt="" />
        </span>
        <span class="absolute -right-3 top-3 w-4 h-4">
          <img src={triangle} alt="" />
        </span>
        <span class="absolute right-0 bottom-0 w-4 h-4">
          <img src={cricle} alt="" />
        </span>
        <img class="w-2/3" src={src} alt="" />
      </div>
    );
  },
});
