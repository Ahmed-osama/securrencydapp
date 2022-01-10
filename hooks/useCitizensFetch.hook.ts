import RootStore from "../stores/index.store";
import { useEffect } from "react";
import useMapStoreStateToComponent from "./useMapStoreStateToComponent.hook";

export function useCitizensFetch(store: RootStore) {
  useEffect(() => {
    store.citizens.init();
    store.citizens.fetchCitizens();
  }, []);
}
