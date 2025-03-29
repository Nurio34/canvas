"use client";

import { useEffect, useRef, useState } from "react";
import { useInitilizeCanvas } from "./hooks/useInitilizeCanvas";

export type DirectionType = "down" | "up" | "right" | "left" | "static";

export type ValocityType = {
  x: number;
  y: number;
};

export class Circle {
  Canvas: HTMLCanvasElement;
  Ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;

  constructor(
    Canvas: HTMLCanvasElement,
    Ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    r: number,
    vx: number,
    vy: number
  ) {
    this.Canvas = Canvas;
    this.Ctx = Ctx;
    this.x = x;
    this.y = y;
    this.r = r;
    this.vx = vx;
    this.vy = vy;
  }

  draw() {
    this.Ctx.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
    this.Ctx.beginPath();
    this.Ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    this.Ctx.fillStyle = "red";
    this.Ctx.fill();
  }

  move(direction: DirectionType[], valocity: ValocityType) {
    const { x: vx, y: vy } = valocity;

    if (direction.includes("down")) {
      this.y = this.y + 1 * vy;
    }
    if (direction.includes("up")) {
      this.y = this.y - 1 * vy;
    }
    if (direction.includes("right")) {
      this.x = this.x + 1 * vx;
    }
    if (direction.includes("left")) {
      this.x = this.x - 1 * vx;
    }
    this.draw();
  }
}

function New() {
  const CanvasRef = useRef<HTMLCanvasElement | null>(null);
  const CtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const CircleRef = useRef<Circle | null>(null);
  const [direction, setDirection] = useState<DirectionType[]>([]);
  const [valocity, setValocity] = useState({ x: 1, y: 1 });
  const AnimationFrameIdRef = useRef(0);

  useInitilizeCanvas(CanvasRef, CtxRef, CircleRef, valocity);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;

      setDirection((prev) => {
        const staticExtracted = prev.filter((d) => d !== "static");

        switch (key) {
          case "ArrowDown":
            if (!staticExtracted.includes("down")) {
              staticExtracted.push("down");
            }

            break;

          case "ArrowUp":
            if (!staticExtracted.includes("up")) {
              staticExtracted.push("up");
            }

            break;

          case "ArrowRight":
            if (!staticExtracted.includes("right")) {
              staticExtracted.push("right");
            }

            break;

          case "ArrowLeft":
            if (!staticExtracted.includes("left")) {
              staticExtracted.push("left");
            }

            break;

          default:
            break;
        }

        return staticExtracted;
      });
    };

    window.addEventListener("keydown", handleKeyDown);

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key;

      setDirection((prev) => {
        let directions = prev;

        switch (key) {
          case "ArrowDown":
            if (directions.includes("down"))
              setValocity((prev) => ({ ...prev, y: 1 }));
            directions = directions.filter((d) => d !== "down");
            break;

          case "ArrowUp":
            if (directions.includes("up"))
              setValocity((prev) => ({ ...prev, y: 1 }));

            directions = directions.filter((d) => d !== "up");
            break;
          case "ArrowRight":
            if (directions.includes("right"))
              setValocity((prev) => ({ ...prev, x: 1 }));

            directions = directions.filter((d) => d !== "right");
            break;
          case "ArrowLeft":
            if (directions.includes("left"))
              setValocity((prev) => ({ ...prev, x: 1 }));

            directions = directions.filter((d) => d !== "left");
            break;

          default:
            break;
        }

        return directions;
      });
    };

    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const isX = direction.includes("left") || direction.includes("right");
    const isY = direction.includes("down") || direction.includes("up");
    const isBoth = isX && isY;

    setValocity((prev) => {
      return isBoth
        ? { x: prev.x + 0.1, y: prev.y + 0.1 }
        : isX
        ? { ...prev, x: prev.x + 0.1 }
        : { ...prev, y: prev.y + 0.1 };
    });
  }, [direction]);

  useEffect(() => {
    cancelAnimationFrame(AnimationFrameIdRef.current);

    function animate() {
      if (CircleRef.current) {
        CircleRef.current.move(direction, valocity);
      }
      AnimationFrameIdRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(AnimationFrameIdRef.current);
    };
  }, [direction]);

  return <canvas ref={CanvasRef} className="grow" />;
}
export default New;
