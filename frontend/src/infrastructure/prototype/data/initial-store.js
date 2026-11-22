import { INITIAL_PLANS, INITIAL_RECEIPTS } from "./mock-plans-receipts.js";
import { INITIAL_LOTS } from "./lots-demo.js";
import { INITIAL_ISSUE_REQUESTS, INITIAL_ISSUES, INITIAL_WORKSHOP_BALANCES } from "./issues-demo.js";
import { INITIAL_RECOVERIES, INITIAL_REPAIRS, INITIAL_SCRAPS } from "./recovery-demo.js";
import { INITIAL_DISPOSALS, INITIAL_AUDITS } from "./control-demo.js";
import {
  INITIAL_WAREHOUSES,
  INITIAL_LOCATIONS,
  INITIAL_SUPPLIERS,
  INITIAL_WORKSHOPS,
  INITIAL_USERS,
  INITIAL_ROLES,
  INITIAL_TECHNICAL_NORMS,
} from "./mock-master-data.js";

export const INITIAL_STORE = {
  procurementPlans: INITIAL_PLANS,
  receipts: INITIAL_RECEIPTS,
  lots: INITIAL_LOTS,
  issueRequests: INITIAL_ISSUE_REQUESTS,
  issues: INITIAL_ISSUES,
  workshopBalances: INITIAL_WORKSHOP_BALANCES,
  recoveries: INITIAL_RECOVERIES,
  repairs: INITIAL_REPAIRS,
  scraps: INITIAL_SCRAPS,
  disposals: INITIAL_DISPOSALS,
  audits: INITIAL_AUDITS,
  warehouses: INITIAL_WAREHOUSES,
  locations: INITIAL_LOCATIONS,
  suppliers: INITIAL_SUPPLIERS,
  workshops: INITIAL_WORKSHOPS,
  users: INITIAL_USERS,
  roles: INITIAL_ROLES,
  technicalNorms: INITIAL_TECHNICAL_NORMS,
};
