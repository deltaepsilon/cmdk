import { NOOP, useValue } from 'ui';
import { useCallback, useEffect, useState } from 'react';

import useLaggedValue from './use-lagged-value';

export interface Coordinates {
  x: number;
  y: number;
  clientX: number;
  clientY: number;
}
interface Args {
  isActive: boolean;
  onDrag: (coordinates: {
    changeX: number;
    changeY: number;
    clientX: number;
    clientY: number;
    startX: number;
    startY: number;
  }) => void;
  onDragEnd: () => void;
  x: number;
  y: number;
}

const DEFAULT_DRAG_START_COORDINATES: Coordinates = {
  x: 0,
  y: 0,
  clientX: 0,
  clientY: 0,
};

export default function useDrag({ isActive, onDrag, onDragEnd, x, y }: Args) {
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
        const { clientX, clientY } = dragStartCoordinates;
        const changeX = e.clientX - clientX;
        const changeY = e.clientY - clientY;

        console.log({ clientX, eClientX: e.clientX });

        onDrag({
          changeX,
          changeY,
          clientX: e.clientX,
          clientY: e.clientY,
          startX: clientX,
          startY: clientY,
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
    console.log({ isDragging, laggedIsDragging });
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
