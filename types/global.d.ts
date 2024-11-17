export {};

declare global {
  interface Window {
    $message: ReturnType<typeof useMessage>;
  }
}
