import { fieldClassName } from "./field-classes.js";

export function Input({ variant = "standard", className, ...props }) {
  return <input {...props} className={fieldClassName(variant, className)} />;
}
