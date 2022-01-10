import { ETHEREUM } from "../constants";
import RootStore from "../stores/index.store";
import { useEffect } from "react";

export function useEthereumEvents(store: RootStore) {
  useEffect(() => {
    if (store.provider.hasProvider) {
      /**
       * @event
       * accountsChanged
       */
      store.provider.provider.on(
        ETHEREUM.ON_ACCOUNT_CHANGED,
        (accounts: any[]) => {
          store.provider.setAccounts(accounts);
        }
      );

      /**
       * @event
       * disconnect
       */
      store.provider.provider.on(ETHEREUM.ON_DISCONNECT, () => {
        store.provider.setAccounts([]);
      });
    }
  }, []);
}
