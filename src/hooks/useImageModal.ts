import { useState, useCallback, useEffect, useRef } from "react";

interface ModalImage {
  src: string;
  alt: string;
  title?: string;
}

export function useImageModal() {
  const [active, setActive] = useState<ModalImage | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef<{ x: number; y: number } | null>(null);
  const panOriginRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value));

  const open = useCallback((image: ModalImage) => {
    setActive(image);
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setIsPanning(false);
    panStartRef.current = null;
  }, []);

  const close = useCallback(() => {
    setActive(null);
  }, []);

  const zoomIn = useCallback(() => {
    setZoom((z) => clamp(z + 0.1, 1, 3));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((z) => clamp(z - 0.1, 1, 3));
  }, []);

  const reset = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const onMouseDown = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    setIsPanning(true);
    panStartRef.current = { x: event.clientX, y: event.clientY };
    panOriginRef.current = { ...pan };
  }, [pan]);

  useEffect(() => {
    if (!isPanning) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (!panStartRef.current) return;
      const dx = event.clientX - panStartRef.current.x;
      const dy = event.clientY - panStartRef.current.y;
      setPan({
        x: panOriginRef.current.x + dx,
        y: panOriginRef.current.y + dy,
      });
    };

    const handleMouseUp = () => {
      setIsPanning(false);
      panStartRef.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isPanning]);

  const onWheel = useCallback((event: React.WheelEvent) => {
    event.preventDefault();
    const delta = event.deltaY < 0 ? 0.1 : -0.1;
    setZoom((z) => clamp(z + delta, 1, 3));
  }, []);

  return {
    active,
    zoom,
    pan,
    isPanning,
    open,
    close,
    zoomIn,
    zoomOut,
    reset,
    onMouseDown,
    onWheel,
  };
}
