import { loadPrototypeStore, persistPrototypeStore } from "../storage/prototype-storage.js";
/** Prototype adapter shared by linked features; it owns persistence and notifications. */
import { INITIAL_STORE } from "./data/initial-store.js";
import { createProcurementActions } from "./actions/procurement-actions.js";
import { createReceiptsActions } from "./actions/receipts-actions.js";
import { createIssuesActions } from "./actions/issues-actions.js";
import { createRecoveryActions } from "./actions/recovery-actions.js";
import { createDisposalActions } from "./actions/disposal-actions.js";
import { createStocktakingActions } from "./actions/stocktaking-actions.js";
import { createMasterActions } from "./actions/master-actions.js";

let currentStore = loadPrototypeStore(INITIAL_STORE);
const listeners = new Set();

function notify() {
  persistPrototypeStore(currentStore);
  listeners.forEach((fn) => fn(currentStore));
}

const context = {
  getSnapshot: () => currentStore,
  commit(next) {
    currentStore = next;
    notify();
  },
};

export const MockStore = {
  getSnapshot: context.getSnapshot,
  subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
  ...createProcurementActions(context),
  ...createReceiptsActions(context),
  ...createIssuesActions(context),
  ...createRecoveryActions(context),
  ...createDisposalActions(context),
  ...createStocktakingActions(context),
  ...createMasterActions(context),
};
