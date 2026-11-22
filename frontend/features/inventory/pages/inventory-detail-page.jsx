import { InventorySummary } from "../components/inventory-summary.jsx";
import { InventoryTable } from "../components/inventory-table.jsx";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Icon } from "../../../design-system/icon/icon.jsx";
import { Badge } from "../../../design-system/badge/badge.jsx";
import { InventoryFilterToolbar } from "../components/inventory-filter-toolbar.jsx";

const PAGE_SIZE = 10;

export function InventoryDetailPage({ detailList = [] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterWarehouse, setFilterWarehouse] = useState("all");
  const [filterGroup, setFilterGroup] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const groups = useMemo(() => {
    const set = new Set(detailList.map((item) => item.group).filter(Boolean));
    return Array.from(set);
  }, [detailList]);

  const filtered = useMemo(() => {
    return detailList.filter((item) => {
      if (filterWarehouse !== "all" && item.warehouse !== filterWarehouse) return false;
      if (filterGroup !== "all" && item.group !== filterGroup) return false;
      if (searchTerm) {
        const query = searchTerm.toLowerCase().trim();
        const matchCode = item.code.toLowerCase().includes(query);
        const matchName = item.name.toLowerCase().includes(query);
        if (!matchCode && !matchName) return false;
      }
      return true;
    });
  }, [detailList, filterWarehouse, filterGroup, searchTerm]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  const handleReset = () => {
    setSearchTerm("");
    setFilterWarehouse("all");
    setFilterGroup("all");
    setCurrentPage(1);
  };

  return (
    <div className="d-flex flex-column gap-4">
      {/* Title Row */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 pb-1 border-bottom border-outline-variant">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <h1 className="font-headline fs-4 m-0 text-dark">Chi tiết tồn kho</h1>
            <Badge variant="neutral">Dữ liệu minh hoạ</Badge>
          </div>
          <p className="text-muted small m-0" style={{ fontSize: "12.5px" }}>
            Tra cứu số lượng tồn thực tế theo từng kho, mã vật tư và nhóm vật tư • Cập nhật lúc 08:30, 20/11/2026
          </p>
        </div>

        <Link
          to="/"
          className="btn-ui-secondary"
          style={{ minHeight: "36px" }}
        >
          <Icon name="arrow_back" size={16} />
          <span>Về tổng quan</span>
        </Link>
      </div>

      {/* Enterprise Summary Strip: Chỉ số tổng hợp nhanh */}
      <InventorySummary detailList={detailList} groups={groups} />

      {/* Filter Toolbar */}
      <InventoryFilterToolbar
        searchTerm={searchTerm}
        setSearchTerm={(term) => {
          setSearchTerm(term);
          setCurrentPage(1);
        }}
        filterWarehouse={filterWarehouse}
        setFilterWarehouse={(wh) => {
          setFilterWarehouse(wh);
          setCurrentPage(1);
        }}
        filterGroup={filterGroup}
        setFilterGroup={(grp) => {
          setFilterGroup(grp);
          setCurrentPage(1);
        }}
        groups={groups}
        onReset={handleReset}
      />

      {/* Inventory Table Container */}
      <InventoryTable PAGE_SIZE={PAGE_SIZE} currentPage={currentPage} filterWarehouse={filterWarehouse} filtered={filtered} handleReset={handleReset} paginatedItems={paginatedItems} setCurrentPage={setCurrentPage} totalPages={totalPages} />
    </div>
  );
}
