import { RiFullscreenExitLine, RiFullscreenLine } from '@remixicon/vue';

export default defineComponent({
  setup() {
    const isFull = ref<boolean>(false);

    const handleClick = () => {
      isFull.value ? document.exitFullscreen() : document.documentElement.requestFullscreen();
      isFull.value = !isFull.value;
    };

    document.addEventListener('fullscreenchange', () => {
      isFull.value = !!document.fullscreenElement;
    });
    return () => (
      <div class="flex items-center cursor-pointer" onClick={handleClick}>
        {!isFull.value ? <RiFullscreenLine size="20" /> : <RiFullscreenExitLine size="20" />}
      </div>
    );
  },
});
