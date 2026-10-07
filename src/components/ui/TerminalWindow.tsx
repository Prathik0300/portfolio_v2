import type { CSSProperties, ReactNode } from "react";

type TerminalWindowProps = {
  title?: ReactNode;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

/** Reusable window chrome: three dots + a mono title + optional right slot. */
export function TerminalWindow({
  title,
  right,
  children,
  className,
  style,
}: TerminalWindowProps) {
  return (
    <div className={`term ${className ?? ""}`} style={style}>
      <div className="term__bar">
        <span className="term__dot" aria-hidden />
        <span className="term__dot" aria-hidden />
        <span className="term__dot" aria-hidden />
        {title ? <span style={{ marginLeft: 6 }}>{title}</span> : null}
        {right ? <span style={{ marginLeft: "auto" }}>{right}</span> : null}
      </div>
      {children}
    </div>
  );
}
