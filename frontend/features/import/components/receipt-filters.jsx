import { Button } from "../../../design-system/button/button.jsx";
import { Input } from "../../../design-system/input/input.jsx";
import { Select } from "../../../design-system/select/select.jsx";
import { Icon } from "../../../design-system/icon/icon.jsx";

export function ReceiptFilters({ activeTab, filterStatus, filterWarehouse, searchTerm, setFilterStatus, setFilterWarehouse, setSearchTerm, state }) {
  return (
    <div className="stitch-card p-3">
      {activeTab === "receipts" && (
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 pb-2.5 mb-2.5 border-bottom border-outline-variant">
          <span className="small text-muted fw-semibold" style={{ fontSize: "12px" }}>Lọc nhanh trạng thái:</span>
          <div className="quick-status-filter-group">
            <Button
              type="button"
              className={`quick-status-filter-btn ${filterStatus === "all" ? "active" : ""}`}
              onClick={() => setFilterStatus("all")}
            >
              <span>Tất cả</span>
              <span className="filter-count-badge">{state.receipts?.length || 0}</span>
            </Button>
            <Button
              type="button"
              className={`quick-status-filter-btn ${filterStatus === "Chờ nhập kho" ? "active" : ""}`}
              onClick={() => setFilterStatus("Chờ nhập kho")}
            >
              <span>Chờ nhập kho</span>
              <span className="filter-count-badge">{(state.receipts || []).filter((r) => r.status === "Chờ nhập kho").length}</span>
            </Button>
            <Button
              type="button"
              className={`quick-status-filter-btn ${filterStatus === "Đã nhập kho" ? "active" : ""}`}
              onClick={() => setFilterStatus("Đã nhập kho")}
            >
              <span>Đã nhập kho</span>
              <span className="filter-count-badge">{(state.receipts || []).filter((r) => r.status === "Đã nhập kho").length}</span>
            </Button>
          </div>
        </div>
      )}
      <div className="row g-3 align-items-end">
        <div className="col-12 col-md-5">
          <label htmlFor="receipt-search" className="form-label small fw-semibold text-dark mb-1">
            Tìm theo mã phiếu, số tham chiếu hoặc mã lô
          </label>
          <div className="input-group input-group-sm">
            <span className="input-group-text bg-white border-end-0 text-muted">
              <Icon name="search" size={15} />
            </span>
            <Input variant="standard"
              id="receipt-search"
              type="search"
              className="border-start-0"
              placeholder="Nhập mã chứng từ (PNK-...) hoặc tham chiếu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-6 col-md-3">
          <label htmlFor="receipt-wh-filter" className="form-label small fw-semibold text-dark mb-1">Kho</label>
          <Select variant="standard"
            id="receipt-wh-filter"
            className="w-100"
            value={filterWarehouse}
            onChange={(e) => setFilterWarehouse(e.target.value)}
          >
            <option value="all">Tất cả kho</option>
            <option value="Kho A">Kho A</option>
            <option value="Kho B">Kho B</option>
            <option value="Kho C">Kho C</option>
          </Select>
        </div>
        {activeTab === "receipts" && (
          <div className="col-6 col-md-3">
            <label htmlFor="receipt-status-filter" className="form-label small fw-semibold text-dark mb-1">Trạng thái</label>
            <Select variant="standard"
              id="receipt-status-filter"
              className="w-100"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="Chờ nhập kho">Chờ nhập kho</option>
              <option value="Đã nhập kho">Đã nhập kho</option>
            </Select>
          </div>
        )}
        <div className="col-12 col-md-auto ms-auto">
          <Button
            type="button"
            variant="secondary" className="w-100"
            onClick={() => { setSearchTerm(""); setFilterWarehouse("all"); setFilterStatus("all"); }}
          >
            Đặt lại lọc
          </Button>
        </div>
      </div>
    </div>
  );
}
