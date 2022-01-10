import RootStore from "../stores/index.store";
import useMapStoreStateToComponent from "./useMapStoreStateToComponent.hook";

export const useHeaderState = (store: RootStore) => {
  return useMapStoreStateToComponent(store, (store) => ({
    promptWalletSignIn: store.provider.promptWalletSignIn,
    isConnected: store.provider.isConnected,
    currentAccount: store.provider.currentAccount,
  }));
};
