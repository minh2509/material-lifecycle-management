import { Button } from "../../design-system/button/button.jsx";
import { Icon } from "../../design-system/icon/icon.jsx";
import { Link } from "react-router-dom";
import { DEMO_USER } from "./demo-account.js";

export function AppTopbar({ getPageTitle, location, setMobileMenuOpen, setShowProvenance }) {
  return (
    <header className="app-topbar">
      <div className="d-flex align-items-center gap-3">
        <Button
          type="button"
          className="btn btn-link p-1 d-lg-none text-dark"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Mở menu di động"
        >
          <Icon name="menu" size={20} />
        </Button>
        <nav aria-label="Đường dẫn điều hướng" className="d-none d-sm-flex align-items-center" style={{ fontSize: "12.5px", color: "var(--on-surface-variant)", gap: "4px" }}>
          <Link to="/" className="topbar-crumb-link" title="Quay về Trang chủ hệ thống">
            Hệ thống
          </Link>
          <span className="text-muted-subtle" style={{ margin: "0 2px" }} aria-hidden="true">/</span>
          <Link to="/" className="topbar-crumb-link" title="Quay về Phân hệ Quản lý vật tư">
            Quản lý vật tư
          </Link>
          <span className="text-muted-subtle" style={{ margin: "0 2px" }} aria-hidden="true">/</span>
          <Link
            to={location.pathname}
            className="topbar-crumb-active"
            style={{ marginLeft: "2px" }}
            title={`Trang hiện tại: ${getPageTitle()}`}
            aria-current="page"
          >
            {getPageTitle()}
          </Link>
        </nav>
      </div>

      <div className="d-flex align-items-center gap-3">
        <Button
          type="button"
          className="topbar-demo-pill"
          onClick={() => setShowProvenance(true)}
          title="Xem thông tin dữ liệu minh hoạ"
        >
          <span className="topbar-demo-dot" />
          <span>Dữ liệu minh hoạ</span>
        </Button>

        {/* Bell icon notification */}
        <Button
          type="button"
          className="topbar-bell-btn"
          title="Thông báo"
          onClick={() => setShowProvenance(true)}
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
          <span className="topbar-bell-dot" />
        </Button>

        {/* User profile */}
        <div className="d-flex align-items-center gap-2 ps-2 border-start border-outline-variant">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center fw-bold"
            style={{ width: "32px", height: "32px", fontSize: "12px", background: "var(--primary)", color: "#fff" }}
          >
            {DEMO_USER.avatar}
          </div>
          <div className="d-none d-md-block text-start" style={{ lineHeight: 1.2 }}>
            <div className="fw-semibold text-dark" style={{ fontSize: "12.5px" }}>{DEMO_USER.name}</div>
            <div className="text-muted" style={{ fontSize: "11px" }}>{DEMO_USER.role}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
