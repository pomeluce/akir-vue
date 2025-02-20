import { HatId } from '@/utils/hat';

const hat = new HatId([32, 36, 1]);

export default function (prefix: string, simple: boolean = true): string {
  if (simple) {
    return hat.nextPrefixed(`${prefix}-`);
  }

  if (typeof crypto.randomUUID === 'function') {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  if (typeof crypto.getRandomValues === 'function' && typeof Uint8Array !== 'undefined') {
    const arr = new Uint8Array(16);
    crypto.getRandomValues(arr);
    arr[6] = (arr[6] & 0x0f) | 0x40; // UUID v4 标准
    arr[8] = (arr[8] & 0x3f) | 0x80;

    const toHex = (num: number) => num.toString(16).padStart(2, '0');
    return `${prefix}-${[...arr].map(toHex).join('')}`;
  }

  // Fallback: 生成 UUID v4 格式的随机字符串
  return `${prefix}-${'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  })}`;
}
