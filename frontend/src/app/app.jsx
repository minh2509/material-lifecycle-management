import { Button } from "../design-system/button/button.jsx";
import { BrowserRouter } from "react-router-dom";
import { useInventoryWorkspace } from "../features/inventory/index.js";
import { AppShell } from "./layouts/app-shell.jsx";
import { AppRouter } from "./router/app-router.jsx";
import { Icon } from "../design-system/icon/icon.jsx";

export function App() {
  const workspace = useInventoryWorkspace();
  const { isLoading: catalogLoading, error: catalogError, refetch, provenance } = workspace;
  if (catalogLoading) return (<div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
        <div className="text-center p-4">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </div>
          <div className="font-headline fs-6 text-dark">Đang nạp dữ liệu vật tư...</div>
          <div className="text-muted small">Khởi tạo kịch bản từ danh mục khách hàng</div>
        </div>
      </div>);
  if (catalogError) return (<div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
        <div className="p-4 bg-white rounded border border-danger shadow-sm text-center max-w-md">
          <Icon name="warning" size={32} color="#B91C1C" className="mb-2" />
          <div className="font-headline text-danger fs-6 fw-bold mb-1">Không thể tải dữ liệu</div>
          <p className="text-muted small mb-3">{catalogError.message || "Lỗi nạp dữ liệu từ máy chủ"}</p>
          <Button type="button" variant="primary" onClick={() => refetch()}>
            Tải lại trang
          </Button>
        </div>
      </div>);
  return (
    <BrowserRouter>
      <AppShell provenance={provenance}>
        <AppRouter workspace={workspace} />
      </AppShell>
    </BrowserRouter>
  );
}
