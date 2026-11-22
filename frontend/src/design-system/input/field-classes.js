const VARIANTS = { standard: "form-control", compact: "form-control form-control-sm", native: "" };

export function fieldClassName(variant, className) {
  return [VARIANTS[variant], className].filter(Boolean).join(" ") || undefined;
}
