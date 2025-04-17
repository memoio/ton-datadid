"use client"; // if you're using Next.js App Router

import { useEffect, useRef } from "react";

export default function TouchTracker({ onIntersect }) {
    const targetRef = useRef(null);

    useEffect(() => {
        const checkIntersection = (x, y) => {
            const rect = targetRef.current?.getBoundingClientRect();
            if ( rect && x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom ) {
                onIntersect?.(); // Trigger the passed-in callback
            }
        };

    const handlePointerMove = (e) => {
        checkIntersection(e.clientX, e.clientY);
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [onIntersect]);

  return (
    <div
      ref={targetRef}
      style={{
        width: "100px",
        height: "100px",
        background: "red",
        position: "absolute",
        top: "200px",
        left: "100px",
      }}
    />
  );
}
