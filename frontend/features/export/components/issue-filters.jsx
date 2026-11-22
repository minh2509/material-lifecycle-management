import { Button } from "../../../design-system/button/button.jsx";
import { Input } from "../../../design-system/input/input.jsx";
import { Select } from "../../../design-system/select/select.jsx";
import { Icon } from "../../../design-system/icon/icon.jsx";

export function IssueFilters({ filterShift, filterWorkshop, searchTerm, setFilterShift, setFilterWorkshop, setSearchTerm, state }) {
  return (
    <div className="stitch-card p-3">
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 pb-2.5 mb-2.5 border-bottom border-outline-variant">
        <span className="small text-muted fw-semibold" style={{ fontSize: "12px" }}>Lọc nhanh trạng thái xuất:</span>
        <div className="quick-status-filter-group">
          <Button
            type="button"
            className={`quick-status-filter-btn ${searchTerm === "" ? "active" : ""}`}
            onClick={() => setSearchTerm("")}
          >
            <span>Tất cả</span>
            <span className="filter-count-badge">{state.issues?.length || 0}</span>
          </Button>
          <Button
            type="button"
            className={`quick-status-filter-btn ${searchTerm === "Chờ xuất" ? "active" : ""}`}
            onClick={() => setSearchTerm("Chờ xuất")}
          >
            <span>Chờ xuất</span>
            <span className="filter-count-badge">{(state.issues || []).filter((i) => i.status === "Chờ xuất").length}</span>
          </Button>
          <Button
            type="button"
            className={`quick-status-filter-btn ${searchTerm === "Đã xuất" ? "active" : ""}`}
            onClick={() => setSearchTerm("Đã xuất")}
          >
            <span>Đã xuất</span>
            <span className="filter-count-badge">{(state.issues || []).filter((i) => i.status === "Đã xuất").length}</span>
          </Button>
        </div>
      </div>
      <div className="row g-3 align-items-end">
        <div className="col-12 col-md-5">
          <label htmlFor="issue-search" className="form-label small fw-semibold text-dark mb-1">Tìm kiếm theo mã phiếu, nội dung hoặc người nhận</label>
          <div className="input-group input-group-sm">
            <span className="input-group-text bg-white border-end-0 text-muted"><Icon name="search" size={15} /></span>
            <Input variant="standard" id="issue-search" type="search" className="border-start-0" placeholder="Nhập PXK-... hoặc người nhận..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </div>
        <div className="col-6 col-md-3">
          <label htmlFor="issue-ws-filter" className="form-label small fw-semibold text-dark mb-1">Phân xưởng nhận</label>
          <Select variant="standard" id="issue-ws-filter" className="w-100" value={filterWorkshop} onChange={(e) => setFilterWorkshop(e.target.value)}>
            <option value="all">Tất cả phân xưởng</option>
            <option value="Phân xưởng Khai thác 1">Phân xưởng Khai thác 1</option>
            <option value="Phân xưởng Khai thác 2">Phân xưởng Khai thác 2</option>
            <option value="Phân xưởng Cơ điện Vận tải Lò">Phân xưởng Cơ điện</option>
          </Select>
        </div>
        <div className="col-6 col-md-2">
          <label htmlFor="issue-shift-filter" className="form-label small fw-semibold text-dark mb-1">Ca làm việc</label>
          <Select variant="standard" id="issue-shift-filter" className="w-100" value={filterShift} onChange={(e) => setFilterShift(e.target.value)}>
            <option value="all">Tất cả ca</option>
            <option value="Ca1">Ca 1</option>
            <option value="Ca2">Ca 2</option>
            <option value="Ca3">Ca 3</option>
            <option value="Hành chính">Hành chính</option>
          </Select>
        </div>
        <div className="col-12 col-md-auto ms-auto">
          <Button
            type="button"
            variant="secondary" className="w-100"
            onClick={() => { setSearchTerm(""); setFilterWorkshop("all"); setFilterShift("all"); }}
          >
            Đặt lại lọc
          </Button>
        </div>
      </div>
    </div>
  );
}
