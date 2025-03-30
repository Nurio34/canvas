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

    for (let index = 0; index < 100; index++) {
      const R = Math.floor(Math.random() * 5 + 4);

      const X = canvas.width / 2;
      const Y = canvas.height / 2;

      const DistParam = Math.random() * 2 + 1;

      const randomDirectionX = Math.random();
      const randomDirectionY = Math.random();
      const V = Math.floor(Math.random() * 5 + 5);
      const Vx = randomDirectionX * V;
      const Vy = randomDirectionY * V;
      const color = colors[Math.floor(Math.random() * 9)];
      const id = crypto.randomUUID();
      const circle = new Circle(
        canvas,
        ctx,
        X,
        Y,
        R,
        Vx,
        Vy,
        color,
        id,
        DistParam
      );
      circles.push(circle);
    }
    CirclesRef.current = circles;
  }, []);
};
