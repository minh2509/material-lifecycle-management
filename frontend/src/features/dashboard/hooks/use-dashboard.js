import { normalizeWarehouse, selectCurrentFlow } from "../services/dashboard-selectors.js";
import { INVENTORY_ITEMS, MONTHLY_FLOWS, INITIAL_TASK_GROUPS } from "../data/dashboard-demo.js";
import { useState, useMemo, useCallback } from "react";
import { WAREHOUSES } from "../../../shared/data/warehouses.js";
import { getAvailablePeriods } from "../../../shared/utils/date-utils.js";

export function useDashboard({
  selectedWarehouse = "all",
  setSelectedWarehouse,
  selectedPeriod,
  setSelectedPeriod,
}) {
  const periods = getAvailablePeriods();
  const [taskTab, setTaskTab] = useState("all");
  const [resolvedTaskIds, setResolvedTaskIds] = useState(new Set());
  const [activeTaskModalGroup, setActiveTaskModalGroup] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [chartTooltip, setChartTooltip] = useState(null);
  const warehouseKey = useMemo(() => normalizeWarehouse(selectedWarehouse), [selectedWarehouse]);

  const warehouseDisplayName = useMemo(() => {
    if (selectedWarehouse === "Kho A") return "Kho A";
    if (selectedWarehouse === "Kho B") return "Kho B";
    if (selectedWarehouse === "Kho C") return "Kho C";
    if (warehouseKey === "main") return "Kho vật tư (Kho chính)";
    if (warehouseKey === "workshop") return "Phân xưởng sản xuất";
    return "Tất cả các kho";
  }, [selectedWarehouse, warehouseKey]);

  const warehouseOptions = useMemo(() => [
    { value: "all", label: "Tất cả các kho" },
    { value: "kho-chinh", label: "Kho chính" },
    { value: "phan-xuong", label: "Phân xưởng" },
    ...WAREHOUSES.filter((w) => w.id !== "all").map((w) => ({ value: w.id, label: w.name })),
  ], []);

  const periodKey = selectedPeriod?.key || "2026-11";
  const isSixMonthMode = periodKey === "all-6-months" || periodKey === "6m";
  const currentFlow = useMemo(() => selectCurrentFlow(periodKey, warehouseKey, isSixMonthMode), [periodKey, warehouseKey, isSixMonthMode]);
  const filteredInventory = useMemo(() => {
    if (warehouseKey === "main") return INVENTORY_ITEMS.filter((i) => i.qtyMain > 0);
    if (warehouseKey === "workshop") return INVENTORY_ITEMS.filter((i) => i.qtyWorkshop > 0);
    return INVENTORY_ITEMS;
  }, [warehouseKey]);
  const statusCounts = useMemo(() => {
    const counts = { active: 0, eval: 0, repair: 0, scrap: 0 };
    filteredInventory.forEach((item) => {
      counts[item.status] = (counts[item.status] || 0) + 1;
    });
    return counts;
  }, [filteredInventory]);
  const getGroupMatchingItems = useCallback(
    (group) => {
      return group.items.filter((item) => {
        if (resolvedTaskIds.has(item.id)) return false;
        const matchWh = warehouseKey === "all" || item.warehouse === warehouseKey;
        const matchPr = isSixMonthMode || item.period === periodKey;
        return matchWh && matchPr;
      });
    },
    [warehouseKey, isSixMonthMode, periodKey, resolvedTaskIds]
  );

  const visibleTaskGroups = useMemo(() => {
    return INITIAL_TASK_GROUPS.map((g) => ({
      ...g,
      matchingItems: getGroupMatchingItems(g),
    })).filter((g) => {
      const matchTab = taskTab === "all" || g.category === taskTab;
      return matchTab && g.matchingItems.length > 0;
    });
  }, [taskTab, getGroupMatchingItems]);

  const totalPendingTasks = useMemo(() => {
    return INITIAL_TASK_GROUPS.reduce((acc, g) => acc + getGroupMatchingItems(g).length, 0);
  }, [getGroupMatchingItems]);
  const handleResolveTaskItem = (item) => {
    setResolvedTaskIds((prev) => new Set([...prev, item.id]));
    showToast(`Đã xử lý thành công hồ sơ ${item.code}`);
  };

  const openTaskDialog = (groupId) => {
    setActiveTaskModalGroup(groupId);
    setShowTaskModal(true);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleActionClick = (e, msg) => {
    e.stopPropagation();
    setAlertMessage(msg || "Chức năng xem xử lý đang phát triển.");
    setTimeout(() => setAlertMessage(null), 3000);
  };
  const handleToggleSegment = (mode) => {
    if (!setSelectedPeriod) return;
    if (mode === "6m") {
      const p6m = periods.find((p) => p.key === "all-6-months") || { key: "6m", label: "6 tháng (06–11/2026)" };
      setSelectedPeriod(p6m);
    } else {
      const pMonth = periods.find((p) => p.key === "2026-11") || periods[0];
      setSelectedPeriod(pMonth);
    }
  };
  const currentMonthMeta = useMemo(() => {
    return MONTHLY_FLOWS.find((m) => m.key === periodKey);
  }, [periodKey]);

  const totalDocs =
    currentFlow.inBuy +
    currentFlow.inRec +
    currentFlow.outProd +
    currentFlow.outFix +
    currentFlow.recIn +
    currentFlow.recScrap;

  const inSum = currentFlow.inBuy + currentFlow.inRec;
  const outSum = currentFlow.outProd + currentFlow.outFix;
  const recSum = currentFlow.recIn + currentFlow.recScrap;

  const pIn = totalDocs > 0 ? (inSum / totalDocs) * 100 : 0;
  const pOut = totalDocs > 0 ? (outSum / totalDocs) * 100 : 0;
  const pRec = totalDocs > 0 ? (recSum / totalDocs) * 100 : 0;

  return {
    header: {
      currentMonthMeta,
      periodKey,
      periods,
      selectedWarehouse,
      setSelectedPeriod,
      setSelectedWarehouse,
      warehouseDisplayName,
      warehouseOptions,
    },
    summary: {
      cards: {
        available: { filteredInventory, warehouseKey },
        locations: { setSelectedWarehouse, warehouseKey },
        conditions: { statusCounts },
        documents: {
          currentMonthMeta,
          inSum,
          isSixMonthMode,
          openTaskDialog,
          outSum,
          pIn,
          pOut,
          pRec,
          recSum,
          totalDocs,
          totalPendingTasks,
        },
      },
    },
    movements: {
      chartTooltip,
      currentFlow,
      currentMonthMeta,
      handleToggleSegment,
      inSum,
      isSixMonthMode,
      outSum,
      recSum,
      setChartTooltip,
      warehouseDisplayName,
      warehouseKey,
    },
    tasks: {
      handleActionClick,
      openTaskDialog,
      setTaskTab,
      taskTab,
      totalPendingTasks,
      visibleTaskGroups,
    },
    dialog: {
      activeTaskModalGroup,
      currentMonthMeta,
      getGroupMatchingItems,
      handleResolveTaskItem,
      isSixMonthMode,
      setShowTaskModal,
      showTaskModal,
      warehouseDisplayName,
    },
    feedback: { alertMessage, setAlertMessage, toastMessage },
  };
}
