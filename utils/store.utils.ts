import RootStore from "../stores/index.store";

let store: RootStore | null = null;
export const initStore = () => {
  if (!store) {
    store = new RootStore();
    (<any>global).store = store;
  }
  return store;
};
