import { Circle } from "../page";

export const detectCollision = (circle: Circle, otherCircle: Circle) => {
  const xDiff = circle.x - otherCircle.x;
  const yDiff = circle.y - otherCircle.y;

  const dist = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
  const minDist = circle.r + otherCircle.r;

  if (dist <= minDist) {
    //! onCollision events
    return { id1: circle.id, id2: otherCircle.id };
  }

  return { id1: null, id2: null };
};
