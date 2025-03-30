import { RefObject } from "react";
import { detectCollision } from "../utils/detectCollision";

export class Circle {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  color: string;
  id: string;

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    r: number,
    vx: number,
    vy: number,
    color: string,
    id: string
  ) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.r = r;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    this.id = id;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
  }
  update(CirclesRef: RefObject<Circle[]>) {
    const circles = CirclesRef.current;

    this.draw();

    const otherCircles = circles.filter((circle) => circle.id !== this.id);
    otherCircles.forEach((circle) => {
      const { id1, id2 } = detectCollision(this, circle);

      if (id1 && id2) {
        CirclesRef.current = CirclesRef.current.filter(
          (circle) => circle.id !== id1 && circle.id !== id2
        );
      }
    });

    this.x += this.vx;
    this.y += this.vy;

    if (this.x - this.r <= 0 || this.x + this.r >= this.canvas.width) {
      this.vx = this.vx * -1;
    } else if (this.y - this.r <= 0 || this.y + this.r >= this.canvas.height) {
      this.vy = this.vy * -1;
    }
  }
}
