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
  DistParam: number;

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    r: number,
    vx: number,
    vy: number,
    color: string,
    id: string,
    DistParam: number
  ) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.r = r;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    this.id = id;
    this.DistParam = DistParam;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
  }
  update() {
    this.draw();

    this.vx += 0.05;
    this.vy += 0.05;

    this.x = this.canvas.width / 2 + Math.cos(this.vx) * 100 * this.DistParam;
    this.y = this.canvas.height / 2 + Math.sin(this.vx) * 100 * this.DistParam;

    if (this.x - this.r <= 0 || this.x + this.r >= this.canvas.width) {
      this.vx = this.vx * -1;
    } else if (this.y - this.r <= 0 || this.y + this.r >= this.canvas.height) {
      this.vy = this.vy * -1;
    }
  }
}
