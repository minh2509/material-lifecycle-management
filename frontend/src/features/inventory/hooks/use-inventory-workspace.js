import { useMemo, useState } from "react";
import { useCatalogQuery, useProvenanceQuery } from "../../../shared/hooks/use-catalog-query.js";
import { getDefaultPeriod } from "../../../shared/utils/date-utils.js";
import { buildDemoScenario } from "../services/scenario-service.js";
import { calculateDetailList } from "../services/inventory-calculator.js";

export function useInventoryWorkspace() {
  const { data: catalog, isLoading, error, refetch } = useCatalogQuery();
  const { data: provenance } = useProvenanceQuery();
  const [selectedWarehouse, setSelectedWarehouse] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState(getDefaultPeriod());
  const scenario = useMemo(() => catalog?.items ? buildDemoScenario(catalog.items) : null, [catalog]);
  const detailList = useMemo(() => {
    if (!catalog?.items || !scenario) return [];
    return calculateDetailList(catalog.items, scenario.initialStocks, scenario.movements, selectedPeriod);
  }, [catalog, scenario, selectedPeriod]);
  return { catalog, provenance, isLoading, error, refetch, detailList,
    selectedWarehouse, setSelectedWarehouse, selectedPeriod, setSelectedPeriod };
}
