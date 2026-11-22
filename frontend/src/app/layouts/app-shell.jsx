import { Button } from "../../design-system/button/button.jsx";
import { MobileNavigation } from "./mobile-navigation.jsx";
import { AppFooter } from "./app-footer.jsx";
import { AppTopbar } from "./app-topbar.jsx";
import { AppSidebar } from "./app-sidebar.jsx";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ALL_SYSTEM_MODULES } from "../router/navigation.js";

import { Icon } from "../../design-system/icon/icon.jsx";
import { ProvenanceModal } from "../../shared/components/provenance-modal.jsx";

export function AppShell({ children, provenance }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProvenance, setShowProvenance] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState(null);
  const location = useLocation();

  useEffect(() => {
    let timer = null;
    const handleToast = (e) => {
      setToast(e.detail);
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => setToast(null), 4500);
    };
    window.addEventListener("app:show-toast", handleToast);
    return () => {
      window.removeEventListener("app:show-toast", handleToast);
      if (timer) clearTimeout(timer);
    };
  }, []);

  const isCurrent = (itemOrPath) => {
    const path = typeof itemOrPath === "string" ? itemOrPath : itemOrPath.path;
    const related = typeof itemOrPath === "object" ? itemOrPath.relatedPaths : null;
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    if (related && related.some((p) => location.pathname.startsWith(p))) return true;
    return false;
  };

  const getPageTitle = () => {
    const sorted = [...ALL_SYSTEM_MODULES]
      .filter((item) => item.path && item.path !== "#")
      .sort((a, b) => b.path.length - a.path.length);
    const match = sorted.find((item) =>
      item.path === "/" ? location.pathname === "/" : location.pathname.startsWith(item.path)
    );
    return match ? match.label : "Tổng quan";
  };

  return (
    <div className="app-layout">
      {/* Desktop Sidebar (230px, sticky 100vh, nền trắng) */}
      <AppSidebar collapsed={collapsed} isCurrent={isCurrent} searchQuery={searchQuery} setCollapsed={setCollapsed} setSearchQuery={setSearchQuery} />

      {/* Main Container */}
      <div className="app-main">
        {/* Top Header (Cao 56px, nền trắng/95, border-b #EDF0F4) */}
        <AppTopbar getPageTitle={getPageTitle} location={location} setMobileMenuOpen={setMobileMenuOpen} setShowProvenance={setShowProvenance} />

        {/* Khung cuộn độc lập cho Nội dung chính & Footer */}
        <div className="app-content-scroll">
          {/* Nội dung chính: Cuộn độc lập */}
          <main className="main-content">{children}</main>

          {/* Footer: Cuộn theo nội dung, không cố định */}
          <AppFooter />
        </div>
      </div>

      {/* Toast Notification (Chuẩn UX Viettel Slide 6 & Slide 19) */}
      {toast && (
        <div className="toast-notice shadow-sm" role="status" style={{ minWidth: "280px" }}>
          <Icon name={toast.type === "error" ? "warning" : "info"} size={16} color={toast.type === "error" ? "#EF4444" : "#38BDF8"} />
          <span className="small">{toast.message}</span>
          <Button
            type="button"
            className="btn-close btn-close-white ms-auto p-0"
            style={{ width: "10px", height: "10px" }}
            onClick={() => setToast(null)}
            aria-label="Đóng thông báo"
          />
        </div>
      )}

      {/* Mobile Offcanvas Drawer */}
      <MobileNavigation isCurrent={isCurrent} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      {/* Provenance Details Modal */}
      <ProvenanceModal
        show={showProvenance}
        onHide={() => setShowProvenance(false)}
        provenance={provenance}
      />
    </div>
  );
}
