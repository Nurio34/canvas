import { RefObject, useEffect, useRef } from "react";
import { Circle } from "../objects/circle";

export const useAnimate = (
  CanvasRef: RefObject<HTMLCanvasElement | null>,
  CtxRef: RefObject<CanvasRenderingContext2D | null>,
  CirclesRef: RefObject<Circle[]>
) => {
  const AnimFrameId = useRef(0);

  useEffect(() => {
    if (CirclesRef.current.length === 0) return;

    const animate = () => {
      if (!CtxRef.current || !CanvasRef.current) return;

      CtxRef.current.clearRect(
        0,
        0,
        CanvasRef.current.width,
        CanvasRef.current.height
      );
      cancelAnimationFrame(AnimFrameId.current);

      CirclesRef.current.forEach((circle) => circle.update());
      AnimFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(AnimFrameId.current);
  }, []);
};
