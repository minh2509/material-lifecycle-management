export function Badge({ variant = "neutral", children, className = "", noDot = false }) {
  const variantClass = {
    neutral: "ui-badge-neutral",
    warning: "ui-badge-warning",
    success: "ui-badge-success",
    error: "ui-badge-error",
    info: "ui-badge-info",
    primary: "ui-badge-primary",
  }[variant] || "ui-badge-neutral";

  return (
    <span className={`ui-badge ${variantClass} ${noDot ? "no-dot" : ""} ${className}`} role="status">
      {children}
    </span>
  );
}
