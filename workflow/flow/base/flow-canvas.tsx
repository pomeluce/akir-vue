import { renderSlot, SlotsType } from 'vue';
import { dragEndHandler, dragMoveHandler, dragStartHandler, initCanvasViewBox, throttleByRaf, wheelHandler } from 'wf/utils';

export interface IFlowCanvasExpose {
  fitViewport: (padding?: number) => void;
  initCanvasViewBox: (el: HTMLDivElement, x: number, y: number, zoom?: number) => void;
}

export default defineComponent<{ direction?: WFDirection }, { zoomChanged: (value: number) => true }, string, SlotsType<{ default?: () => any; header?: () => any }>>(
  (props, { emit, slots, expose }) => {
    const direction = computed(() => props.direction || 'vertical');

    const canvasParent = ref<HTMLDivElement>();
    const canvasRoot = ref<HTMLDivElement>();
    const zoom = ref<number>(1);

    const zoomChanger = (z: number) => {
      zoom.value = z;
      emit('zoomChanged', zoom.value);
    };

    const throttleWheelHandler = (e: WheelEvent) => {
      e.stopPropagation();
      e.preventDefault();
      throttleByRaf((e: WheelEvent) => wheelHandler(canvasRoot.value!, e, zoomChanger))(e);
    };

    const throttleDragMoveHandler = (e: MouseEvent) => {
      e.stopPropagation();
      throttleByRaf((e: MouseEvent) => dragMoveHandler(canvasRoot.value!, e))(e);
    };

    // 自适应布局
    const fitViewport = (padding: number = 20) => {
      if (!canvasRoot.value || !canvasParent.value) return;
      const { width, height } = canvasParent.value.getBoundingClientRect();
      const { width: rootWidth, height: rootHeight } = canvasRoot.value.getBoundingClientRect();

      const parentWidth = width - padding * 2;
      const parentHeight = height - padding * 2;

      const rootRealWidth = rootWidth / zoom.value;
      const rootRealHeight = rootHeight / zoom.value;

      let zoomX = 1;
      let zoomY = 1;
      let z: number;
      let left: number;
      let top: number;

      if (parentWidth < rootRealWidth) {
        zoomX = Math.round((parentWidth * 100) / rootRealWidth) / 100;
      }

      if (parentHeight < rootRealHeight) {
        zoomY = Math.round((parentHeight * 100) / rootRealHeight) / 100;
      }

      if (zoomX <= zoomY) {
        top = Math.round(Math.abs(parentHeight - rootRealHeight * zoomX) / 2) + padding;
        left = Math.round(Math.abs(parentWidth - rootRealWidth * zoomX) / 2) + padding;
        z = zoomX;
      } else {
        top = Math.round(Math.abs(parentHeight - rootRealHeight * zoomY) / 2) + padding;
        left = Math.round(Math.abs(parentWidth - rootRealWidth * zoomY) / 2) + padding;
        z = zoomY;
      }

      zoomChanger(z);
      initCanvasViewBox(canvasRoot.value, left, top, z);
    };

    onMounted(() => {
      const { width, height } = canvasParent.value!.getBoundingClientRect();
      const { width: rootWidth, height: rootHeight } = canvasRoot.value!.getBoundingClientRect();

      const isVertical = direction.value === 'vertical';

      initCanvasViewBox(canvasRoot.value!, isVertical ? (width - rootWidth) / 2 : 0, isVertical ? 0 : (height - rootHeight) / 2);
    });

    useEventListener(canvasParent, 'wheel', throttleWheelHandler, { passive: false });

    expose({ fitViewport, initCanvasViewBox } satisfies IFlowCanvasExpose);

    return () => (
      <div
        class="akir-flow_canvas"
        ref={canvasParent}
        onMousedown={dragStartHandler}
        onMousemove={throttleDragMoveHandler}
        onMouseup={dragEndHandler}
        onClick={e => e.stopPropagation()}
      >
        {renderSlot(slots, 'header')}
        <svg class="akir-flow_root-bg">
          <defs>
            <pattern id="djs-small-grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10,0 L 0,0 0,10 10,10 Z" class="fill-none stroke-rim1 stroke-width-1 opacity-60" />
            </pattern>
            <pattern id="djs-grid-pattern" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100,0 L 0,0 0,100 100,100 Z" class="fill-none stroke-rim2 stroke-width-2 opacity-80" />
              <rect width="100" height="100" style="fill: url('#djs-small-grid-pattern')" />
            </pattern>
          </defs>
          <g class="layer-djs-grid-line">
            <rect x="-50000" y="-50000" width="100000" height="100000" style="fill: url('#djs-grid-pattern')" />
          </g>
        </svg>
        <div class="akir-flow_root" ref={canvasRoot}>
          {renderSlot(slots, 'default')}
        </div>
      </div>
    );
  },
  { name: 'AkirFlowCanvas', props: ['direction'] },
);
