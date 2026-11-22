export function renderIconGroup3(name, common) {
  switch (name) {
case "filter":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
      );
case "alert_triangle":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
case "truck":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <rect width="16" height="13" x="1" y="5" rx="2" />
          <polygon points="17 8 20 8 23 11 23 18 17 18 17 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      );
case "layers":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      );
case "assignment":
case "clipboard":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        </svg>
      );
    default: return null;
  }
}
