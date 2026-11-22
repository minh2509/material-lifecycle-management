import { Button } from "../../design-system/button/button.jsx";
import { Icon } from "../../design-system/icon/icon.jsx";
import { NAVIGATION_ITEMS } from "../router/navigation.js";
import { Link } from "react-router-dom";

export function MobileNavigation({ isCurrent, mobileMenuOpen, setMobileMenuOpen }) {
  return (
    mobileMenuOpen && (
      <>
        <div className="drawer-backdrop" onClick={() => setMobileMenuOpen(false)} />
        <div className="mobile-offcanvas-drawer p-3">
          <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom border-outline-variant">
            <span className="font-headline fw-bold" style={{ fontSize: "15px" }}>Menu phân hệ</span>
            <Button
              type="button"
              className="btn btn-link p-1 text-dark"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Đóng menu di động"
            >
              <Icon name="close" size={20} />
            </Button>
          </div>
          <nav className="d-flex flex-column gap-1">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.id}
                to={item.available ? item.path : "#"}
                className={`nav-item-link ${isCurrent(item) ? "active" : ""}`}
                onClick={(e) => {
                  if (!item.available) e.preventDefault();
                  else setMobileMenuOpen(false);
                }}
              >
                <Icon name={item.icon} size={18} />
                <span className="flex-grow-1">{item.label}</span>
                {!item.available && (
                  <span className="ui-badge ui-badge-neutral text-muted">
                    Chưa mở
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>
      </>
    )
  );
}
