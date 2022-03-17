import { NOOP, useValue } from 'ui';
import { useCallback, useEffect, useState } from 'react';

import useLaggedValue from './use-lagged-value';

export interface Coordinates {
  clientX: number;
  clientY: number;
  x: number;
  y: number;
}
interface Args {
  isActive?: boolean;
  onDrag: (coordinates: {
    changeX: number;
    changeY: number;
    clientX: number;
    clientY: number;
    startX: number;
    startY: number;
  }) => void;
  onDragEnd?: () => void;
  x?: number;
  y?: number;
}

const DEFAULT_DRAG_START_COORDINATES: Coordinates = {
  clientX: 0,
  clientY: 0,
  x: 0,
  y: 0,
};

export default function useDrag({ isActive = true, onDrag, onDragEnd = NOOP, x = 0, y = 0 }: Args) {
  const [dragStartCoordinates, setDragStartCoordinates] = useState<Coordinates>(
    DEFAULT_DRAG_START_COORDINATES,
  );
  const [isDragging, setIsDragging] = useState(false);
  const laggedIsDragging = useLaggedValue(false, isDragging);
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

        onDrag({
          changeX,
          changeY,
          clientX: e.clientX,
          clientY: e.clientY,
          startX: x,
          startY: y,
        });
      }
    },
    [dragStartCoordinates, isDragging, onDrag],
  );

  useEffect(() => {
    if (!isActive) {
      setIsDragging(false);
    }
  }, [isActive, setIsDragging]);

  useEffect(() => {
    !isDragging && setDragStartCoordinates(DEFAULT_DRAG_START_COORDINATES);
  }, [isDragging, setDragStartCoordinates]);

  useEffect(() => {
    if (laggedIsDragging && !isDragging) {
      onDragEnd && onDragEnd();
    }
  }, [isDragging, laggedIsDragging]);

  return useValue({
    isDragging,
    onMouseDown: isActive ? onMouseDown : NOOP,
    onMouseUp: isActive ? onMouseUp : NOOP,
    onMouseMove: isActive ? onMouseMove : NOOP,
    onMouseOut: isActive ? onMouseOut : NOOP,
  });
}
