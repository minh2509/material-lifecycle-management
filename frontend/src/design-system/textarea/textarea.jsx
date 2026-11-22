import { fieldClassName } from "../input/field-classes.js";

export function Textarea({ variant = "standard", className, ...props }) {
  return <textarea {...props} className={fieldClassName(variant, className)} />;
}
