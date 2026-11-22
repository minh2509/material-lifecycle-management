export function createMasterActions({ getSnapshot, commit }) {
  return {
    addWarehouse(wh) {
      const currentStore = getSnapshot();
      commit({ ...currentStore, warehouses: [...currentStore.warehouses, wh] });
    },
    addLocation(loc) {
      const currentStore = getSnapshot();
      commit({ ...currentStore, locations: [...currentStore.locations, loc] });
    },
    addSupplier(sup) {
      const currentStore = getSnapshot();
      commit({ ...currentStore, suppliers: [...currentStore.suppliers, sup] });
    },
    addUser(usr) {
      const currentStore = getSnapshot();
      commit({ ...currentStore, users: [...currentStore.users, usr] });
    },
    updateRolePermissions(roleId, permissions) {
      const currentStore = getSnapshot();
      commit({
        ...currentStore,
        roles: currentStore.roles.map((r) => (r.id === roleId ? { ...r, permissions } : r)),
      });
    },
  };
}
