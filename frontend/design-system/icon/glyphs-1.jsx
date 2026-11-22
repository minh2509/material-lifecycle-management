export function renderIconGroup1(name, common) {
  switch (name) {
case "inventory_2":
case "inventory":
case "box":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
          <path d="m3.3 7 8.7 5 8.7-5" />
          <path d="M12 22V12" />
        </svg>
      );
case "search":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      );
case "search_off":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="m2 2 20 20" />
          <path d="M11 5a6 6 0 0 1 6 6" />
          <path d="M15.5 15.5 21 21" />
          <circle cx="11" cy="11" r="8" />
        </svg>
      );
case "close":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      );
case "arrow_back":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
      );
case "arrow_forward":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      );
case "menu_open":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M3 6h18" />
          <path d="M3 12h14" />
          <path d="M3 18h18" />
          <path d="m19 9-3 3 3 3" />
        </svg>
      );
case "menu":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M4 6h16" />
          <path d="M4 12h16" />
          <path d="M4 18h16" />
        </svg>
      );
case "check_circle":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <circle cx="12" cy="12" r="10" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
case "check":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <polyline points="20 6 9 17 4 12" />
        </svg>
      );
case "warning":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
      );
case "info":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      );
case "tune":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M21 4h-7" />
          <path d="M10 4H3" />
          <path d="M21 12h-9" />
          <path d="M8 12H3" />
          <path d="M21 20h-5" />
          <path d="M12 20H3" />
          <circle cx="14" cy="4" r="2" />
          <circle cx="10" cy="12" r="2" />
          <circle cx="14" cy="20" r="2" />
        </svg>
      );
case "refresh":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
          <path d="M21 3v5h-5" />
          <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
          <path d="M3 21v-5h5" />
        </svg>
      );
case "warehouse":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z" />
          <path d="M6 18h12" />
          <path d="M6 14h12" />
          <rect width="12" height="12" x="6" y="10" />
        </svg>
      );
    default: return null;
  }
}
