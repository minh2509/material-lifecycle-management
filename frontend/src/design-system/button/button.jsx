const VARIANTS = {
  primary: "btn-stitch-primary",
  secondary: "btn-stitch-secondary",
  outline: "btn-stitch-outline-sm",
};

export function Button({ variant, className = "", ...props }) {
  const classes = [VARIANTS[variant], className].filter(Boolean).join(" ");
  return <button {...props} className={classes || undefined} />;
}
