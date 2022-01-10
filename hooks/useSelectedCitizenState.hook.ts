import RootStore from "../stores/index.store";
import { useEffect } from "react";
import useMapStoreStateToComponent from "./useMapStoreStateToComponent.hook";

export function useSelectedCitizenState(store: RootStore) {
  return useMapStoreStateToComponent(store, (store) => ({
    selectedCitizen: store.citizens.selectedCitizen,
    selectedCitizenState: store.citizens.selectedCitizenState,
    isConnected: store.provider.isConnected,
    currentAccount: store.provider.currentAccount,
  }));
}
