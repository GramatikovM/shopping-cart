import { useEffect, useRef } from "react";

//workaround for React Strict Mode mounting the component 2 times.
export const useEffectOnce = (
  effect: () => void | (() => void),
  params: unknown[]
) => {
  const effectFn = useRef<() => void | (() => void)>(effect);
  const destroyFn = useRef<void | (() => void)>();
  const effectCalled = useRef(false);
  const rendered = useRef(false);

  if (effectCalled.current) {
    rendered.current = true;
  }

  useEffect(() => {
    if (!effectCalled.current) {
      destroyFn.current = effectFn.current();
      effectCalled.current = true;
    }

    return () => {
      if (!rendered.current) {
        return;
      }

      if (destroyFn.current) {
        destroyFn.current();
      }
    };
  }, [...params]);
};
