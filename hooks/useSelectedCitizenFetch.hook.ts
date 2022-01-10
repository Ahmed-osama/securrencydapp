import RootStore from "../stores/index.store";
import { useEffect } from "react";
import useMapStoreStateToComponent from "./useMapStoreStateToComponent.hook";
import { useRouter } from "next/router";

export function useSelectedCitizenFetch(store: RootStore) {
  const router = useRouter();
  const id = router.query.id;
  const { contract, fetchOneCitizen, init, resetSelectedCitizen } =
    useMapStoreStateToComponent(store, (store) => ({
      contract: store.citizens.contract,
      fetchOneCitizen: store.citizens.fetchOneCitizen,
      init: store.citizens.init,
      resetSelectedCitizen: store.citizens.resetSelectedCitizen,
    }));

  useEffect(() => {
    if (!contract) init();
  }, [contract]);

  useEffect(() => {
    if (contract) fetchOneCitizen({ id });
  }, [id, contract]);
}
