import Image from "next/image";
import styles from "@/app/projects/[...slug]/page.module.css";

interface DiagramModalProps {
  active: { src: string; alt: string; title?: string } | null;
  zoom: number;
  pan: { x: number; y: number };
  isPanning: boolean;
  onClose: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onMouseDown: (event: React.MouseEvent) => void;
  onWheel: (event: React.WheelEvent) => void;
}

export function DiagramModal({
  active,
  zoom,
  pan,
  isPanning,
  onClose,
  onZoomIn,
  onZoomOut,
  onReset,
  onMouseDown,
  onWheel,
}: DiagramModalProps) {
  if (!active) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className={styles.modalOverlay}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className={styles.modalDialog}
      >
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>{active.title ?? "Diagram"}</div>
          <div className={styles.modalControls}>
            <button
              type="button"
              onClick={onZoomOut}
              className={styles.modalIconButton}
            >
              −
            </button>
            <button
              type="button"
              onClick={onZoomIn}
              className={styles.modalIconButton}
            >
              +
            </button>
            <button
              type="button"
              onClick={onReset}
              className={styles.modalTextButton}
            >
              Reset
            </button>
          </div>
        </div>

        <div
          className={styles.modalViewport}
          onMouseDown={onMouseDown}
          onWheel={onWheel}
        >
          <div
            className={`${styles.modalTransform} ${
              isPanning ? styles.modalTransformGrabbing : ""
            }`}
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            }}
          >
            <Image
              src={active.src}
              alt={active.alt}
              fill
              sizes="(min-width: 1024px) 90vw, 100vw"
              quality={100}
              className={styles.modalImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
