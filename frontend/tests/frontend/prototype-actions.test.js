import test from 'node:test';
import assert from 'node:assert/strict';
import { INITIAL_STORE } from '../../src/infrastructure/prototype/data/initial-store.js';
import { createReceiptsActions } from '../../src/infrastructure/prototype/actions/receipts-actions.js';
import { createIssuesActions } from '../../src/infrastructure/prototype/actions/issues-actions.js';
import { procurementPlanSchema } from '../../src/features/procurement/schemas/procurement-plan-schema.js';
import { normalizeWarehouse, selectCurrentFlow } from '../../src/features/dashboard/services/dashboard-selectors.js';

function workspace() {
  let state = structuredClone(INITIAL_STORE), commits = 0;
  const context = { getSnapshot: () => state, commit: next => { state = next; commits++; } };
  return { context, snapshot: context.getSnapshot, commits: () => commits };
}

test('receipt draft leaves stock unchanged; confirmation updates plan and lot once', () => {
  const ws = workspace(), actions = createReceiptsActions(ws.context);
  const plan = ws.snapshot().procurementPlans[0], material = plan.items[0];
  const before = material.importedQuantity || 0, lotCount = ws.snapshot().lots.length;
  const receipt = actions.createReceipt({ type: 'Mua sắm', referenceNo: plan.contractNo,
    items: [{ code: material.code, name: material.name, unit: material.unit, actualQuantity: 3, unitPrice: 100 }] });
  assert.equal(ws.snapshot().lots.length, lotCount);
  assert.equal(ws.snapshot().procurementPlans[0].items[0].importedQuantity || 0, before);
  actions.confirmReceipt(receipt.id);
  assert.equal(ws.snapshot().procurementPlans[0].items[0].importedQuantity, before + 3);
  assert.equal(ws.snapshot().lots.length, lotCount + 1);
  assert.equal(ws.snapshot().lots.at(-1).sourceDoc, `${receipt.id} (${plan.contractNo})`);
  const committed = ws.commits();
  actions.confirmReceipt(receipt.id);
  actions.confirmReceipt('not-found');
  assert.equal(ws.commits(), committed);
});

test('immediate receipt confirmation does not post again on later confirmation', () => {
  const ws = workspace(), actions = createReceiptsActions(ws.context), plan = ws.snapshot().procurementPlans[0];
  const receipt = actions.createReceipt({ type: 'Mua sắm', referenceNo: plan.contractNo,
    items: [{ code: plan.items[0].code, actualQuantity: 2 }] }, true);
  assert.equal(receipt.status, 'Đã nhập kho');
  const count = ws.snapshot().lots.length;
  actions.confirmReceipt(receipt.id);
  assert.equal(ws.snapshot().lots.length, count);
});

test('issuing preserves request link and transfers lot quantities to workshop once', () => {
  const ws = workspace(), actions = createIssuesActions(ws.context), lot = ws.snapshot().lots[0];
  const request = actions.createIssueRequest({ items: [{ code: lot.materialCode, quantity: 4 }] });
  const issue = actions.createIssue({ requestRef: request.id, workshop: 'Test workshop', shift: 'Ca1',
    items: [{ code: lot.materialCode, name: lot.materialName, unit: lot.unit, lotCode: lot.lotCode, quantity: 4, unitPrice: 100 }] });
  assert.equal(ws.snapshot().lots[0].availableQuantity, lot.availableQuantity);
  actions.confirmIssue(issue.id);
  assert.equal(ws.snapshot().lots[0].availableQuantity, lot.availableQuantity - 4);
  assert.equal(ws.snapshot().issueRequests[0].items[0].issuedQty, 4);
  const balance = ws.snapshot().workshopBalances.find(row => row.workshop === 'Test workshop');
  assert.equal(balance.receivedQty, 4);
  assert.equal(balance.remainingInWorkshop, 4);
  assert.equal(ws.snapshot().issues[0].totalAmount, 400);
  const committed = ws.commits();
  actions.confirmIssue(issue.id);
  actions.confirmIssue('not-found');
  assert.equal(ws.commits(), committed);
});

test('procurement schema retains trim, required-item and quantity validation', () => {
  const data = { contractNo: ' HD-1 ', content: ' Materials ', supplier: 'Supplier', signDate: '2026-11-22',
    items: [{ code: 'GL-001', name: 'Material', unit: 'Mét', approvedQuantity: 2, unitPrice: 0 }] };
  assert.equal(procurementPlanSchema.parse(data).contractNo, 'HD-1');
  assert.equal(procurementPlanSchema.safeParse({ ...data, items: [] }).success, false);
  assert.equal(procurementPlanSchema.safeParse({ ...data, items: [{ ...data.items[0], approvedQuantity: 0 }] }).success, false);
});

test('dashboard selectors retain warehouse aliases and monthly/six-month totals', () => {
  assert.equal(normalizeWarehouse('Kho A'), 'main');
  assert.equal(normalizeWarehouse('phan-xuong'), 'workshop');
  assert.equal(normalizeWarehouse('Kho C'), 'all');
  assert.deepEqual(selectCurrentFlow('2026-11', 'all', false), { inBuy: 37, inRec: 6, outProd: 30, outFix: 6, recIn: 16, recScrap: 4 });
  assert.equal(selectCurrentFlow('6m', 'main', true).inBuy, 196);
});

test('prototype storage retains namespaced values and tolerates corrupt/unavailable storage', async () => {
  const { loadPrototypeStore, persistPrototypeStore } = await import('../../src/infrastructure/storage/prototype-storage.js');
  const original = globalThis.localStorage;
  const values = new Map([['unrelated-key', 'keep']]);
  globalThis.localStorage = { getItem: key => values.get(key) || null, setItem: (key, value) => values.set(key, value) };
  try {
    persistPrototypeStore({ lots: ['saved'] });
    assert.deepEqual(loadPrototypeStore({ receipts: [] }), { receipts: [], lots: ['saved'] });
    assert.equal(values.get('unrelated-key'), 'keep');
    values.set('vat_tu_prototype_linked_store_v1', '{broken');
    assert.deepEqual(loadPrototypeStore({ receipts: [] }), { receipts: [] });
    globalThis.localStorage.setItem = () => { throw new Error('quota'); };
    assert.doesNotThrow(() => persistPrototypeStore({ receipts: [] }));
  } finally {
    if (original === undefined) delete globalThis.localStorage;
    else globalThis.localStorage = original;
  }
});
