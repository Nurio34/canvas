"use client";

import { RefObject, useEffect, useRef } from "react";
import { useInitCanvas } from "./hooks/useInitCanvas";
import { useInitCircles } from "./hooks/useInitCircles";
import { detectCollision } from "./utils/detectCollision";
import { useAnimate } from "./hooks/useAnimate";
import { Circle } from "./objects/circle";

function PopOnCollosion() {
  const CanvasRef = useRef<HTMLCanvasElement | null>(null);
  const CtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const CirclesRef = useRef<Circle[]>([]);

  useInitCanvas(CanvasRef, CtxRef);
  useInitCircles(CanvasRef, CtxRef, CirclesRef);
  useAnimate(CanvasRef, CtxRef, CirclesRef);

  return <canvas ref={CanvasRef} className="grow" />;
}
export default PopOnCollosion;
