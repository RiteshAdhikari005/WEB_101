import { useEffect, useRef } from "react";

export function useIntersectionObserver(onIntersect, options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      },
      { root: null, rootMargin: "0px", threshold: 0.1, ...options },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [onIntersect]);

  return ref;
}
