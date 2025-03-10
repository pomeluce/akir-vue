type EventNode = HTMLElement | Document;

type EventMap<K extends EventNode | Window = EventNode> = K extends HTMLElement ? HTMLElementEventMap : K extends Window ? WindowEventMap : DocumentEventMap;

type EventType<K extends EventNode | Window = EventNode> = keyof EventMap<K>;

type ListenerType<T extends EventNode | Window = EventNode, K extends EventType<T> = EventType<T>> = (event: EventMap<T>[K]) => any;

type MediaQueryListenerType<K extends keyof MediaQueryListEventMap> = (event: MediaQueryListEventMap[K]) => any;
type ListenerOptionType = boolean | AddEventListenerOptions;

type RefEventNode = EventNode | Ref<EventNode | undefined>;

export function useEventListener<K extends EventType<Window>>(type: K, listener: ListenerType<Window, K>, options?: ListenerOptionType): () => void;
export function useEventListener<K extends keyof MediaQueryListEventMap>(el: EventTarget, type: K, listener: MediaQueryListenerType<K>, options?: ListenerOptionType): () => void;
export function useEventListener<K extends EventType<EventNode>>(el: RefEventNode, type: K, listener: ListenerType<EventNode, K>, options?: ListenerOptionType): () => void;
export function useEventListener(...args: any[]) {
  const element = typeof args[0] === 'string' ? window : args.shift();

  let off = () => {};

  const stop = watch(
    () => unref(element),
    el => {
      off();
      if (!el) return;
      el.addEventListener(...args);
      off = () => el.removeEventListener(...args);
    },
    { immediate: true },
  );

  onScopeDispose(() => off());

  return () => {
    off();
    stop();
  };
}
