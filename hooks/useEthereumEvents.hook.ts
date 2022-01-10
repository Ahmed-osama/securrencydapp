import { ETHEREUM } from "../constants";
import RootStore from "../stores/index.store";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";

export function useEthereumEvents(store: RootStore) {
  const toast = useToast();

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
          toast({
            title: "Account Change",
            description: "the connected wallet has changed",
            status: "warning",
            duration: 4000,
            isClosable: true,
          });
        }
      );

      /**
       * @event
       * disconnect
       */
      store.provider.provider.on(ETHEREUM.ON_DISCONNECT, () => {
        console.log("disconnected");
        toast({
          title: "disconnected",
          description: "user has disconnected from wallet",
          status: "warning",
          duration: 4000,
          isClosable: true,
        });
        store.provider.setAccounts([]);
      });
    }
  }, []);
}
