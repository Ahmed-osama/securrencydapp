import RootStore from "../stores/index.store";
import { useEffect } from "react";

export function useInitApplication(store: RootStore) {
  useEffect(() => {
    if (!store.provider.isConnected) {
      store.provider.promptWalletSignIn();
    }
  }, []);
}
