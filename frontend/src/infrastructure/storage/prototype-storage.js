const STORAGE_KEY = "vat_tu_prototype_linked_store_v1";

export function loadPrototypeStore(initialState) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...initialState };
    return { ...initialState, ...JSON.parse(raw) };
  } catch {
    return { ...initialState };
  }
}

export function persistPrototypeStore(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Keep the existing prototype's in-memory behavior when storage is unavailable.
  }
}
