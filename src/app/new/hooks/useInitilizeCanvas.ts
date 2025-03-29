import { RefObject, useEffect } from "react";
import { Circle, ValocityType } from "../page";

export const useInitilizeCanvas = (
  CanvasRef: RefObject<HTMLCanvasElement | null>,
  CtxRef: RefObject<CanvasRenderingContext2D | null>,
  CircleRef: RefObject<Circle | null>,
  valocity: ValocityType
) => {
  useEffect(() => {
    if (!CanvasRef.current) return;

    const canvas = CanvasRef.current;
    canvas.width = CanvasRef.current.getBoundingClientRect().width;
    canvas.height = CanvasRef.current.getBoundingClientRect().height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    CtxRef.current = ctx;

    const circle = new Circle(
      CanvasRef.current,
      CtxRef.current,
      30,
      30,
      30,
      valocity.x,
      valocity.y
    );
    circle.draw();
    CircleRef.current = circle;
  }, []);
};
