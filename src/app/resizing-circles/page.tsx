"use client";

import { useEffect, useRef, useState } from "react";

type PointerType = { x: number; y: number; isUp: boolean };

function Circles() {
  const CanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [circles, setCircles] = useState<Circle[]>([]);
  const [pointer, setPointer] = useState<PointerType>({
    x: -1000,
    y: -1000,
    isUp: false,
  });
  const timeOut = useRef<NodeJS.Timeout | null>(null);

  class Circle {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    r: number;
    minR: number;
    maxR: number;
    vx: number;
    vy: number;
    color: string;

    constructor(
      canvas: HTMLCanvasElement,
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      r: number,
      vx: number,
      vy: number,
      color: string
    ) {
      this.canvas = canvas;
      this.ctx = ctx;
      this.x = x;
      this.y = y;
      this.r = r;
      this.minR = r;
      this.maxR = 50;
      this.vx = vx;
      this.vy = vy;
      this.color = color;
    }

    draw() {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      this.ctx.fillStyle = this.color;
      this.ctx.fill();
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.y >= this.canvas.height - this.r || this.y <= this.r) {
        this.vy *= -1;
      }
      if (this.x >= this.canvas.width - this.r || this.x <= this.r) {
        this.vx *= -1;
      }
      this.draw();
    }
    resize(pointer: PointerType) {
      if (
        pointer.x < this.x + 100 &&
        pointer.x > this.x - 100 &&
        pointer.y < this.y + 100 &&
        pointer.y > this.y - 100
      ) {
        this.r = this.r < this.maxR ? this.r + 1 : this.maxR;
      } else {
        this.r = this.r > this.minR ? this.r - 1 : this.minR;
      }
    }
  }

  useEffect(() => {
    if (!CanvasRef.current) return;

    const canvas = CanvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    canvas.width = CanvasRef.current.getBoundingClientRect().width;
    canvas.height = CanvasRef.current.getBoundingClientRect().height;

    const circles: Circle[] = [];
    const colors = ["red", "green", "blue", "purple", "pink", "orange"];

    for (let i = 0; i < 10000; i++) {
      const r = Math.random() * 5 + 1;
      const x = Math.max(r, Math.random() * (canvas.width - r));
      const y = Math.max(r, Math.random() * (canvas.height - r));
      const v = Math.random() * 5 * (Math.random() > 0.5 ? 1 : -1);
      const color = colors[Math.floor(Math.random() * colors.length)];

      const circle = new Circle(canvas, ctx, x, y, r, v, v, color);
      circles.push(circle);
    }
    setCircles(circles);
  }, []);

  useEffect(() => {
    if (!CanvasRef.current || circles.length === 0) return;

    const canvas = CanvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    function animate() {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      circles.forEach((circle) => {
        // Update position
        circle.update();

        // Handle resizing based on pointer proximity
      });

      requestAnimationFrame(animate);
    }

    animate();
  }, [circles]);

  useEffect(() => {
    if (!CanvasRef.current) return;

    const handlePointer = (e: MouseEvent) => {
      const x = e.offsetX;
      const y = e.offsetY;

      setPointer((prev) => ({ ...prev, x, y }));
    };

    CanvasRef.current.addEventListener("mousemove", handlePointer);

    return () => {
      if (CanvasRef.current)
        CanvasRef.current.removeEventListener("mousemove", handlePointer);
    };
  }, []);

  useEffect(() => {
    circles.forEach((circle) => circle.resize(pointer));
  }, [pointer]);

  useEffect(() => {
    if (timeOut.current) {
      clearInterval(timeOut.current);
    }

    timeOut.current = setInterval(() => {
      setPointer((prev) => ({
        ...prev,
        x: prev.isUp ? prev.x - 1 : prev.x + 1,
        isUp: !prev.isUp,
      }));
    }, 100);

    return () => {
      if (timeOut.current) {
        clearInterval(timeOut.current);
      }
    };
  }, [pointer]);

  return (
    <canvas ref={CanvasRef} className="grow">
      Circles
    </canvas>
  );
}
export default Circles;
