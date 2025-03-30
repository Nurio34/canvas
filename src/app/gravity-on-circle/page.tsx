"use client";

import { useEffect, useRef, useState } from "react";
import { useInitilizeCanvas } from "./hooks/useInitilizeCanvas";

export class Circle {
  Canvas: HTMLCanvasElement;
  Ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  r: number;
  g: number;
  f: number;
  dir: "up" | "down";
  exam: number[];
  color: string;

  constructor(
    Canvas: HTMLCanvasElement,
    Ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    r: number,
    color: string
  ) {
    this.Canvas = Canvas;
    this.Ctx = Ctx;
    this.x = x;
    this.y = y;
    this.r = r;
    this.g = 1;
    this.f = 0.9;
    this.dir = "down";
    this.exam = [];
    this.color = color;
  }

  draw() {
    this.Ctx.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
    this.Ctx.beginPath();
    this.Ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    this.Ctx.fillStyle = this.color;
    this.Ctx.fill();
  }

  update() {
    this.draw();

    const isOnFloor =
      this.exam.length > 0 &&
      this.exam.slice(-3).every((num) => Math.floor(Math.pow(num, 2)) === 0);

    if (isOnFloor) return;

    this.y += this.g;

    if (this.y + this.r >= this.Canvas.height && this.dir === "down") {
      this.g = this.g * -1 * this.f;
      this.dir = "up";
    } else {
      this.g = this.g + 1;
    }
    if (Math.floor(this.g) === 0) this.dir = "down";

    if (this.exam.length > 3) {
      this.exam.splice(0, 1);
    }
    this.exam.push(this.g);
  }
}

function GravityOnCircle() {
  const CanvasRef = useRef<HTMLCanvasElement | null>(null);
  const CtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [circles, setCircles] = useState<Circle[]>([]);
  const AnimationFrameIdRef = useRef(0);

  useInitilizeCanvas(CanvasRef, CtxRef, setCircles);

  useEffect(() => {
    if (circles.length === 0) return;
    console.log(circles);

    const animate = () => {
      circles.forEach((circle) => circle.update());

      cancelAnimationFrame(AnimationFrameIdRef.current);

      AnimationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(AnimationFrameIdRef.current);
  }, [circles]);
  return <canvas ref={CanvasRef} className="grow" />;
}
export default GravityOnCircle;
