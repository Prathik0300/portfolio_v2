interface DesignStepIconProps {
  stepIndex: number; // 0-based index: 0 = first step, 1 = second step, etc.
}

export function DesignStepIcon({ stepIndex }: DesignStepIconProps) {
  const baseProps = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  // Step 1 (index 0) - Always use the same icon
  if (stepIndex === 0) {
    return (
      <svg {...baseProps}>
        <path d="M12 3a4 4 0 1 1-0.01 8.01A4 4 0 0 1 12 3Z" />
        <path d="M5 20a7 7 0 0 1 14 0" />
      </svg>
    );
  }

  // Step 2 (index 1) - Always use the same icon
  if (stepIndex === 1) {
    return (
      <svg {...baseProps}>
        <path d="M12 3a4 4 0 0 1 4 4c0 1.7-1.1 3.2-2.6 3.8L13 13h-2l-0.4-2.2A4 4 0 0 1 12 3Z" />
        <path d="M9 18h6" />
        <path d="M10.5 21h3" />
      </svg>
    );
  }

  // Step 3 (index 2) - Always use the same icon
  if (stepIndex === 2) {
    return (
      <svg {...baseProps}>
        <circle cx="6" cy="6" r="2.5" />
        <circle cx="18" cy="6" r="2.5" />
        <circle cx="12" cy="18" r="2.5" />
        <path d="M8.2 7.8 10.3 16" />
        <path d="M15.8 7.8 13.7 16" />
      </svg>
    );
  }

  // Step 4 (index 3) - Always use the same icon
  if (stepIndex === 3) {
    return (
      <svg {...baseProps}>
        <rect x="4" y="5" width="16" height="14" rx="2" />
        <path d="M8 9h8" />
        <path d="M8 13h5" />
      </svg>
    );
  }

  // Step 5+ (index 4+) - Use checkmark icon
  return (
    <svg {...baseProps}>
      <path d="M7 12 10.5 15.5 17 9" />
      <path d="M4 6h16" />
      <path d="M4 18h16" />
    </svg>
  );
}
