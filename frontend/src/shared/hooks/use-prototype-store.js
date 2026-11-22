import { useSyncExternalStore } from "react";
import { MockStore } from "../../infrastructure/prototype/mock-data-store.js";

export function usePrototypeStore() {
  const state = useSyncExternalStore(MockStore.subscribe, MockStore.getSnapshot);
  return { state, store: MockStore };
}
