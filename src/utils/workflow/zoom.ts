let scale: number = 1; // 缩放倍率
const zoomStep: number = 0.2; // 缩放步长
let lasts: number = 1;
const minL: number = 0.2;
const maxL: number = 4;
let zoomLeft: number = 0; // 记录缩放时的位置
let zoomTop: number = 0; // 记录缩放时的位置

export function initCanvasViewBox(el: HTMLDivElement, x: number, y: number, zoom = 1) {
  zoomLeft = x;
  zoomTop = y;
  scale = lasts = zoom;
  updateCanvasViewBox(el, zoomLeft, zoomTop, scale);
}

export function updateCanvasViewBox(el: HTMLDivElement, x: number, y: number, scale = 1) {
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  el.style.transform = `scale(${scale})`;

  const bg = document.querySelector('.ding-flow_canvas .ding-flow_root-bg') as HTMLDivElement;
  if (bg) {
    bg.style.left = `${x}px`;
    bg.style.top = `${y}px`;
    bg.style.transform = `scale(${scale}) translate(-50%, -50%)`;
  }
}

/* 获取在当前缩放状态下, 鼠标位置相对于画布的原始坐标 */
function getSourcePosition(el: HTMLDivElement, scale: number, x: number, y: number) {
  const sourceTop = +el.style.top.slice(0, -2);
  const sourceLeft = +el.style.left.slice(0, -2);

  const x2 = (x - sourceLeft) / scale;
  const y2 = (y - sourceTop) / scale;

  return { x2, y2 };
}

/* 根据新的缩放比例, 计算出新的平移位置, 确保缩放中心不变 */
function getXY(scale: number, x: number, y: number, x2: number, y2: number) {
  // 缩放后的位置
  const x3 = x2 * scale;
  const y3 = y2 * scale;

  // 缩放后的位置移动到鼠标位置, 需要的位移
  const x4 = x - x3;
  const y4 = y - y3;

  return { x4, y4 };
}

export function zoomHandle(el: HTMLDivElement, e: WheelEvent, callback?: (zoom: number) => void) {
  const { x, y, deltaY } = e;

  if (deltaY % 100 !== 0) return;

  scale += deltaY * zoomStep * -0.01;
  scale = Math.round(Math.min(Math.max(minL, scale), maxL) * 100) / 100;

  // 放大
  if (deltaY < 0) {
    const { x2, y2 } = getSourcePosition(el, lasts, x, y);

    const { x4, y4 } = getXY(scale, x, y, x2, y2);

    if (lasts < maxL) {
      lasts = scale;
      zoomLeft = x4;
      zoomTop = y4;
      updateCanvasViewBox(el, x4, y4, scale);
      callback?.(scale);
    }
  }
  // 缩小
  if (deltaY > 0) {
    const { x2, y2 } = getSourcePosition(el, lasts, x, y);

    const { x4, y4 } = getXY(scale, x, y, x2, y2);

    if (lasts > minL) {
      lasts = scale;
      zoomLeft = x4;
      zoomTop = y4;
      updateCanvasViewBox(el, x4, y4, scale);
      callback?.(scale);
    }
  }
}

/* 鼠标滚动控制: 缩放, 上下/左右滚动 */
export function wheelHandler(el: HTMLDivElement, e: WheelEvent, callback?: (zoom: number) => void) {
  e.preventDefault();

  // ctrl + 滚动: 缩放调整
  if (e.ctrlKey) return zoomHandle(el, e, callback);

  // shift + 滚动: 上下移动
  if (e.shiftKey) zoomLeft -= e.deltaY;
  else zoomTop -= e.deltaY;
  return updateCanvasViewBox(el, zoomLeft, zoomTop, scale);
}

/* 画布拖拽 */
let isDragging: boolean = false;
let isMousedown: boolean = false;
let startX: number = 0;
let startY: number = 0;
let draggingX: number = 0;
let draggingY: number = 0;

export function dragStartHandler(e: MouseEvent) {
  e.stopPropagation();
  e.preventDefault();
  isMousedown = true;
  startX = e.clientX;
  startY = e.clientY;
}

export function dragMoveHandler(el: HTMLDivElement, e: MouseEvent) {
  e.preventDefault();
  if (!isMousedown) return;
  if (!isDragging && (Math.abs(e.clientX - startX) > 5 || Math.abs(e.clientY - startY) > 5)) {
    document.body.style.cursor = 'grabbing';
    isDragging = true;
  }
  if (!isDragging) return;

  draggingX = zoomLeft + e.clientX - startX;
  draggingY = zoomTop + e.clientY - startY;

  updateCanvasViewBox(el, draggingX, draggingY, scale);
}

export function dragEndHandler(e: MouseEvent) {
  e.stopPropagation();
  e.preventDefault();
  isMousedown = false;
  if (isDragging) {
    isDragging = false;
    document.body.style.cursor = 'auto';
    zoomLeft = draggingX;
    zoomTop = draggingY;
  }
}
