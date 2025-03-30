import { RefObject, useEffect } from "react";

export const useInitCanvas = (
  CanvasRef: RefObject<HTMLCanvasElement | null>,
  CtxRef: RefObject<CanvasRenderingContext2D | null>
) => {
  useEffect(() => {
    if (!CanvasRef.current) return;

    const canvas = CanvasRef.current;
    canvas.width = CanvasRef.current.getBoundingClientRect().width;
    canvas.height = CanvasRef.current.getBoundingClientRect().height;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;
    CtxRef.current = ctx;
  }, []);
};
