export function Badge({ variant = "neutral", children, className = "", noDot = false }) {
  const variantClass = {
    neutral: "stitch-badge-neutral",
    warning: "stitch-badge-warning",
    success: "stitch-badge-success",
    error: "stitch-badge-error",
    info: "stitch-badge-info",
    primary: "stitch-badge-primary",
  }[variant] || "stitch-badge-neutral";

  return (
    <span className={`stitch-badge ${variantClass} ${noDot ? "no-dot" : ""} ${className}`} role="status">
      {children}
    </span>
  );
}
