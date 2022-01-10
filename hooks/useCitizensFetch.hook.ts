import RootStore from "../stores/index.store";
import { useEffect } from "react";
import useMapStoreStateToComponent from "./useMapStoreStateToComponent.hook";

export function useCitizensFetch(store: RootStore) {
  useEffect(() => {
    if (!store.citizens.contract) store.citizens.init();
    if (!store.citizens.hasCitizens) store.citizens.fetchCitizens();
  }, []);
}
