import { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import { Circle } from "../page";

export const useInitilizeCanvas = (
  CanvasRef: RefObject<HTMLCanvasElement | null>,
  CtxRef: RefObject<CanvasRenderingContext2D | null>,
  setCircles: Dispatch<SetStateAction<Circle[]>>
) => {
  useEffect(() => {
    if (!CanvasRef.current) return;

    const canvas = CanvasRef.current;
    canvas.width = CanvasRef.current.getBoundingClientRect().width;
    canvas.height = CanvasRef.current.getBoundingClientRect().height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    CtxRef.current = ctx;

    const circles: Circle[] = [];
    const colors = ["red", "green", "blue"];
    for (let i = 0; i < 3; i++) {
      const R = Math.random() * 30 + 30;
      const randomX = Math.random() * canvas.width;
      const X =
        randomX - R < 0
          ? 0
          : randomX + R > canvas.width
          ? randomX - R
          : randomX;
      const randomY = Math.random() * canvas.height;
      const Y =
        randomY - R < 0
          ? 0
          : randomY + R > canvas.height
          ? randomY - R
          : randomY;

      const color = colors[i];

      const circle = new Circle(
        CanvasRef.current,
        CtxRef.current,
        X,
        Y,
        R,
        color
      );
      circles.push(circle);
    }

    setCircles(circles);
  }, []);
};
