import { useRef, type Ref, useEffect } from "react";

const useOuterClick = (
  callback: () => void,
  isActive: boolean = false,
): Ref<HTMLDivElement> => {
  const callbackRef = useRef(callback); // initialize mutable ref, which stores callback
  const containerRef = useRef<HTMLDivElement>(null); // returned to client, who marks "border" element
  // update cb on each render, so second useEffect has access to current value
  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    if (!isActive) return;

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
    function handleClick(e: MouseEvent) {
      if (
        containerRef.current &&
        callbackRef.current &&
        !containerRef.current.contains(e.target as Node)
      )
        callbackRef.current();
    }
  }, [isActive]); // no dependencies -> stable click listener

  return containerRef; // convenience for client (doesn't need to init ref himself)
};

export { useOuterClick };
