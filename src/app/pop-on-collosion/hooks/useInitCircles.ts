import { RefObject, useEffect } from "react";
import { Circle } from "../objects/circle";

export const useInitCircles = (
  CanvasRef: RefObject<HTMLCanvasElement | null>,
  CtxRef: RefObject<CanvasRenderingContext2D | null>,
  CirclesRef: RefObject<Circle[]>
) => {
  useEffect(() => {
    if (!CanvasRef.current || !CtxRef.current) return;

    const canvas = CanvasRef.current;
    const ctx = CtxRef.current;

    const colors = [
      "red",
      "green",
      "blue",
      "pink",
      "purple",
      "gray",
      "black",
      "orange",
      "yellow",
    ];

    const circles: Circle[] = [];

    for (let index = 0; index < 200; index++) {
      const R = Math.floor(Math.random() * 5 + 4);
      const randomX = Math.floor(Math.random() * canvas.width);
      const X =
        randomX + R >= canvas.width
          ? canvas.width - R
          : randomX - R < 0
          ? randomX + R
          : randomX;

      const randomY = Math.random() * canvas.height;
      const Y =
        randomY + R >= canvas.height
          ? randomY - R
          : randomY - R < 0
          ? randomY + R
          : randomY;
      const randomDirectionX = Math.random() > 0.5 ? 1 : -1;
      const randomDirectionY = Math.random() > 0.5 ? 1 : -1;
      const V = Math.floor(Math.random() * 5 + 5);
      const Vx = randomDirectionX * V;
      const Vy = randomDirectionY * V;
      const color = colors[Math.floor(Math.random() * 9)];
      const id = crypto.randomUUID();
      const circle = new Circle(canvas, ctx, X, Y, R, Vx, Vy, color, id);
      circles.push(circle);
    }
    CirclesRef.current = circles;
  }, []);
};
