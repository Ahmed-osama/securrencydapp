import RootStore from "../stores/index.store";
import useMapStoreStateToComponent from "./useMapStoreStateToComponent.hook";

export const useCitizensState = (store: RootStore) => {
  return useMapStoreStateToComponent(store, (store) => ({
    currentPage: store.citizens.currentPage,
    totalCount: store.citizens.totalCount,
    paginationList: store.citizens.paginationList,
    displayedPaginationList: store.citizens.displayedPaginationList,
    displayedCitizens: store.citizens.displayedCitizens,
    setPage: store.citizens.setPage,
    lastPage: store.citizens.lastPage,
    toTheBeginning: store.citizens.toTheBeginning,
    toTheEnd: store.citizens.toTheEnd,
    nextPage: store.citizens.nextPage,
    prevPage: store.citizens.prevPage,
    citizensListState: store.citizens.citizensListState,
  }));
};
