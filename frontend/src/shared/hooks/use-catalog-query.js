import { useQuery } from "@tanstack/react-query";
import { fetchCatalog, fetchProvenance } from "../../infrastructure/api/catalog-service.js";

export function useCatalogQuery() {
  return useQuery({
    queryKey: ["catalog"],
    queryFn: ({ signal }) => fetchCatalog(signal),
  });
}

export function useProvenanceQuery() {
  return useQuery({
    queryKey: ["provenance"],
    queryFn: ({ signal }) => fetchProvenance(signal),
  });
}
