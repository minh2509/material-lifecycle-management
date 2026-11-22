import { Button } from "../../design-system/button/button.jsx";
import { Input } from "../../design-system/input/input.jsx";
import { NAVIGATION_GROUPS } from "../router/navigation.js";
import { Link } from "react-router-dom";
import { Icon } from "../../design-system/icon/icon.jsx";

export function AppSidebar({ collapsed, isCurrent, searchQuery, setCollapsed, setSearchQuery }) {
  return (
    <aside className={`app-sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="d-flex flex-column flex-grow-1 min-h-0">
        {/* Logo & Nút thu gọn */}
        <div className="sidebar-header">
          {collapsed ? (
            <Button
              type="button"
              className="sidebar-brand-toggle-btn sidebar-collapse-btn"
              onClick={() => setCollapsed(false)}
              title="Mở rộng thanh điều hướng"
              aria-label="Mở rộng thanh điều hướng"
            >
              <div className="sidebar-brand-icon">
                <svg className="brand-box-icon" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.1" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                </svg>
                <svg className="brand-expand-icon" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                </svg>
              </div>
            </Button>
          ) : (
            <>
              <div className="d-flex align-items-center gap-2 overflow-hidden">
                <div className="sidebar-brand-icon">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.1" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                  </svg>
                </div>
                <span className="font-headline fw-semibold text-truncate" style={{ fontSize: "14.5px", color: "var(--on-surface)", letterSpacing: "-0.01em" }}>
                  Quản lý vật tư
                </span>
              </div>
              <Button
                type="button"
                className="btn btn-link p-1 text-secondary sidebar-collapse-btn"
                onClick={() => setCollapsed(true)}
                title="Thu gọn menu"
                aria-label="Thu gọn thanh điều hướng"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                </svg>
              </Button>
            </>
          )}
        </div>

        {/* Ô tìm kiếm chức năng */}
        {!collapsed && (
          <div className="px-3 pt-3 pb-1">
            <div className="sidebar-search-box">
              <svg className="sidebar-search-icon" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <Input variant="native"
                type="text"
                placeholder="Tìm chức năng..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="sidebar-search-input"
                aria-label="Tìm chức năng"
              />
            </div>
          </div>
        )}

        {/* Danh sách các nhóm điều hướng */}
        <nav className="flex-grow-1 overflow-y-auto px-3 py-2 d-flex flex-column gap-3">
          {NAVIGATION_GROUPS.map((group) => {
            const filteredItems = group.items.filter((item) =>
              item.label.toLowerCase().includes(searchQuery.toLowerCase().trim())
            );
            if (filteredItems.length === 0) return null;

            return (
              <div key={group.id} className={`sidebar-nav-group ${group.id === "system" ? "border-top border-outline-variant pt-2 mt-1" : ""}`}>
                {!collapsed && (
                  <div className="sidebar-group-title">
                    {group.title}
                  </div>
                )}
                <div className="d-flex flex-column gap-1">
                  {filteredItems.map((item) => {
                    const active = isCurrent(item);
                    return (
                      <Link
                        key={item.id}
                        to={item.available ? item.path : "#"}
                        className={`nav-item-link ${active ? "active" : ""} ${!item.available ? "nav-item-locked" : ""}`}
                        onClick={(e) => {
                          if (!item.available) {
                            e.preventDefault();
                          }
                        }}
                        title={!item.available ? `${item.label} (Phân hệ chưa mở)` : item.label}
                      >
                        <Icon name={item.icon} size={17} className="flex-shrink-0" />
                        {!collapsed && (
                          <div className="d-flex align-items-center justify-content-between flex-grow-1 min-w-0">
                            <span className="text-truncate">{item.label}</span>
                            {!item.available && (
                              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="sidebar-lock-icon flex-shrink-0">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                              </svg>
                            )}
                          </div>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Chân Sidebar */}
      {!collapsed && (
        <div className="sidebar-footer">
          <span className="sidebar-footer-dot" />
          <span className="text-truncate">Quản trị nội bộ · v2.4</span>
        </div>
      )}
    </aside>
  );
}
