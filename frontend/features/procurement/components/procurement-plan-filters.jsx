import { Button } from "../../../design-system/button/button.jsx";
import { Input } from "../../../design-system/input/input.jsx";
import { Select } from "../../../design-system/select/select.jsx";
import { Icon } from "../../../design-system/icon/icon.jsx";

export function ProcurementPlanFilters({ filterStatus, searchTerm, setFilterStatus, setSearchTerm, state }) {
  return (
    <div className="ui-card p-3">
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 pb-2.5 mb-2.5 border-bottom border-outline-variant">
        <span className="small text-muted fw-semibold" style={{ fontSize: "12px" }}>Lọc nhanh trạng thái hồ sơ:</span>
        <div className="quick-status-filter-group">
          <Button
            type="button"
            className={`quick-status-filter-btn ${filterStatus === "all" ? "active" : ""}`}
            onClick={() => setFilterStatus("all")}
          >
            <span>Tất cả</span>
            <span className="filter-count-badge">{state.procurementPlans?.length || 0}</span>
          </Button>
          <Button
            type="button"
            className={`quick-status-filter-btn ${filterStatus === "Duyệt" ? "active" : ""}`}
            onClick={() => setFilterStatus("Duyệt")}
          >
            <span>Đã duyệt</span>
            <span className="filter-count-badge">{(state.procurementPlans || []).filter((p) => p.status === "Duyệt").length}</span>
          </Button>
          <Button
            type="button"
            className={`quick-status-filter-btn ${filterStatus === "Khởi tạo" ? "active" : ""}`}
            onClick={() => setFilterStatus("Khởi tạo")}
          >
            <span>Khởi tạo</span>
            <span className="filter-count-badge">{(state.procurementPlans || []).filter((p) => p.status === "Khởi tạo").length}</span>
          </Button>
        </div>
      </div>
      <div className="row g-3 align-items-end">
        <div className="col-12 col-md-6">
          <label htmlFor="plan-search" className="form-label small fw-semibold text-dark mb-1">
            Tìm kiếm theo mã hồ sơ, số hợp đồng hoặc nhà cung cấp
          </label>
          <div className="input-group input-group-sm">
            <span className="input-group-text bg-white border-end-0 text-muted">
              <Icon name="search" size={15} />
            </span>
            <Input variant="standard"
              id="plan-search"
              type="search"
              className="border-start-0"
              placeholder="Nhập số hợp đồng (HĐ-...) hoặc nhà cung cấp..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-6 col-md-3">
          <label htmlFor="plan-status-filter" className="form-label small fw-semibold text-dark mb-1">Trạng thái hồ sơ</label>
          <Select variant="standard"
            id="plan-status-filter"
            className="w-100"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="Khởi tạo">Khởi tạo</option>
            <option value="Duyệt">Duyệt</option>
          </Select>
        </div>
        <div className="col-6 col-md-auto ms-auto">
          <Button
            type="button"
            variant="secondary" className="w-100"
            onClick={() => { setSearchTerm(""); setFilterStatus("all"); }}
          >
            Đặt lại lọc
          </Button>
        </div>
      </div>
    </div>
  );
}
