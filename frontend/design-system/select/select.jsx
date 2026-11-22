export function Select({ variant = "standard", className, ...props }) {
  const classes = [variant === "native" ? "" : "app-custom-select", className].filter(Boolean).join(" ");
  return <select {...props} className={classes || undefined} />;
}
