import { Input } from "../../../design-system/input/input.jsx";
import { Select } from "../../../design-system/select/select.jsx";
import { Button } from "../../../design-system/button/button.jsx";
import { Icon } from "../../../design-system/icon/icon.jsx";

export function InventoryFilterToolbar({
  searchTerm,
  setSearchTerm,
  filterWarehouse,
  setFilterWarehouse,
  filterGroup,
  setFilterGroup,
  groups = [],
  onReset,
}) {
  const warehouseOptions = [
    { value: "all", label: "Tất cả kho" },
    { value: "Kho A", label: "Kho A" },
    { value: "Kho B", label: "Kho B" },
    { value: "Kho C", label: "Kho C" },
  ];

  const groupOptions = [
    { value: "all", label: "Tất cả nhóm" },
    ...groups.map((grp) => ({ value: grp, label: grp })),
  ];

  return (
    <div className="ui-card p-3 p-md-3.5">
      <div className="row g-3 align-items-end">
        <div className="col-12 col-md-4">
          <label htmlFor="search-input" className="form-label small fw-semibold text-dark mb-1.5" style={{ fontSize: "12.5px" }}>
            Tìm theo mã hoặc tên vật tư
          </label>
          <div className="input-group input-group-sm">
            <span className="input-group-text bg-white border-end-0 text-muted">
              <Icon name="search" size={15} color="var(--on-surface-muted)" />
            </span>
            <Input variant="standard"
              id="search-input"
              type="search"
              className="border-start-0"
              placeholder="Nhập mã (VD: BL-001) hoặc tên..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="col-6 col-md-3">
          <label htmlFor="filter-warehouse" className="form-label small fw-semibold text-dark mb-1.5" style={{ fontSize: "12.5px" }}>
            Kho
          </label>
          <Select variant="standard"
            id="filter-warehouse"
            className="w-100"
            value={filterWarehouse}
            onChange={(e) => setFilterWarehouse(e.target.value)}
          >
            {warehouseOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        </div>

        <div className="col-6 col-md-3">
          <label htmlFor="filter-group" className="form-label small fw-semibold text-dark mb-1.5" style={{ fontSize: "12.5px" }}>
            Nhóm vật tư
          </label>
          <Select variant="standard"
            id="filter-group"
            className="w-100"
            value={filterGroup}
            onChange={(e) => setFilterGroup(e.target.value)}
          >
            {groupOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        </div>

        <div className="col-12 col-md-2 d-flex justify-content-md-end">
          <Button
            type="button"
            variant="secondary" className="w-100"
            onClick={onReset}
          >
            <Icon name="refresh" size={14} />
            <span>Đặt lại bộ lọc</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
