import RootStore from "../stores/index.store";
import useMapStoreStateToComponent from "./useMapStoreStateToComponent.hook";

export const useAddCitizenState = (store: RootStore) => {
  return useMapStoreStateToComponent(store, (store) => ({
    addCitizen: store.citizens.addCitizen,
    addCitizenState: store.citizens.addCitizenState,
    currentAccount: store.provider.currentAccount,
    isConnected: store.provider.isConnected,
  }));
};
