import { ETHEREUM } from "../constants";
import RootStore from "../stores/index.store";
import { useEffect } from "react";

export function useEthereumEvents(store: RootStore) {
  useEffect(() => {
    console.log({ "store.provider": store.provider });
    if (store.provider.hasProvider) {
      store.provider.provider.on(
        ETHEREUM.ON_ACCOUNT_CHANGED,
        (accounts: any[]) => {
          console.log(accounts);
          store.provider.setAccounts(accounts);
        }
      );
    }
  }, []);
}
