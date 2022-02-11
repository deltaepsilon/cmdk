import { useCallback, useEffect, useState } from 'react';

import { useValue } from 'ui';

export interface Coordinates {
  x: number;
  y: number;
  clientX: number;
  clientY: number;
}
interface Args {
  onDrag: (coordinates: { changeX: number; changeY: number; startX: number; startY: number }) => void;
  ref: React.RefObject<HTMLElement>;
  x: number;
  y: number;
}

const DEFAULT_DRAG_START_COORDINATES: Coordinates = {
  x: 0,
  y: 0,
  clientX: 0,
  clientY: 0,
};

export default function useDrag({ onDrag, ref, x, y }: Args) {
  const [dragStartCoordinates, setDragStartCoordinates] = useState<Coordinates>(
    DEFAULT_DRAG_START_COORDINATES,
  );
  const [isDragging, setIsDragging] = useState(false);
  const onMouseDown = useCallback(
    (e) => {
      const { clientX, clientY } = e;

      setDragStartCoordinates({ clientX, clientY, x, y });
      setIsDragging(true);
    },
    [x, y],
  );
  const onMouseUp = useCallback(() => setIsDragging(false), []);
  const onMouseOut = useCallback(() => setIsDragging(false), []);
  const onMouseMove = useCallback(
    (e) => {
      if (isDragging) {
        const { clientX, clientY, x, y } = dragStartCoordinates;
        const changeX = e.clientX - clientX;
        const changeY = e.clientY - clientY;

        onDrag({ changeX, changeY, startX: x, startY: y });
      }
    },
    [dragStartCoordinates, isDragging, onDrag],
  );

  useEffect(() => {
    !isDragging && setDragStartCoordinates(DEFAULT_DRAG_START_COORDINATES);
  }, [isDragging, setDragStartCoordinates]);

  return useValue({ isDragging, onMouseDown, onMouseUp, onMouseMove, onMouseOut });
}
