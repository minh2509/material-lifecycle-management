import { renderIconGroup1 } from "./glyphs-1.jsx";
import { renderIconGroup2 } from "./glyphs-2.jsx";
import { renderIconGroup3 } from "./glyphs-3.jsx";
export function BootstrapIcon({ name, size = 16, className = "", color, style = {}, ...props }) {
  const iconClass = name.startsWith("bi-") ? name : `bi-${name}`;
  return (
    <i
      className={`bi ${iconClass} ${className}`}
      style={{
        fontSize: typeof size === "number" ? `${size}px` : size,
        color: color || "currentColor",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: 1,
        ...style,
      }}
      aria-hidden="true"
      {...props}
    />
  );
}

export function Icon({ name, size = 18, className = "", color = "currentColor", ...props }) {
  if (typeof name === "string" && (name.startsWith("bi-") || name.startsWith("bi:"))) {
    return (
      <BootstrapIcon
        name={name.replace(/^bi[:-]/, "")}
        size={size}
        className={className}
        color={color}
        {...props}
      />
    );
  }

  const common = {
    width: size,
    height: size,
    fill: "none",
    stroke: color,
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: `ui-icon ${className}`,
    ...props,
  };

  return renderIconGroup1(name, common) || renderIconGroup2(name, common) || renderIconGroup3(name, common) || (<svg viewBox="0 0 24 24" {...common}>
          <circle cx="12" cy="12" r="10" />
        </svg>);
}
