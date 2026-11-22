const VARIANTS = {
  primary: "btn-ui-primary",
  secondary: "btn-ui-secondary",
  outline: "btn-ui-outline-sm",
};

export function Button({ variant, className = "", ...props }) {
  const classes = [VARIANTS[variant], className].filter(Boolean).join(" ");
  return <button {...props} className={classes || undefined} />;
}
