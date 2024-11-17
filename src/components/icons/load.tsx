export default defineComponent({
  props: {
    strokeWidth: {
      type: Number,
      default: 28,
    },
  },
  setup({ strokeWidth }) {
    return () => (
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <g>
          <animateTransform attributeName="transform" type="rotate" values="0 100 100;270 100 100" begin="0s" dur="1.6s" fill="freeze" repeatCount="indefinite" />
          <circle
            class="w-[1em] h-[1em]"
            fill="none"
            stroke="currentColor"
            stroke-width={strokeWidth}
            stroke-linecap="round"
            cx="100"
            cy="100"
            r="86"
            stroke-dasharray="567"
            stroke-dashoffset="1848"
          >
            <animateTransform attributeName="transform" type="rotate" values="0 100 100;135 100 100;450 100 100" begin="0s" dur="1.6s" fill="freeze" repeatCount="indefinite" />
            <animate attributeName="stroke-dashoffset" values="567;142;567" begin="0s" dur="1.6s" fill="freeze" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    );
  },
});
