import axios from "axios";
import { apiClient } from "./api-client.js";

export async function fetchCatalog(signal) {
  try {
    const res = await apiClient.get("/demo/catalog.json", { signal });
    return res.data;
  } catch (err) {
    if (axios.isCancel(err)) throw err;
    console.error("Failed to load catalog.json:", err);
    throw new Error("Không thể tải danh mục vật tư minh hoạ.", { cause: err });
  }
}

export async function fetchProvenance(signal) {
  try {
    const res = await apiClient.get("/demo/provenance.json", { signal });
    return res.data;
  } catch (err) {
    if (axios.isCancel(err)) throw err;
    console.warn("Could not load provenance.json:", err);
    return null;
  }
}
