export function Table({ variant = "standard", className, ...props }) {
  const classes = [variant === "native" ? "" : "stitch-table", className].filter(Boolean).join(" ");
  return <table {...props} className={classes || undefined} />;
}
