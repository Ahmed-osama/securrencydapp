import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import RootStore from "../stores/index.store";
import { initStore } from "../utils/store.utils";
import { useEthereumEvents } from "../hooks/useEthereumEvents.hook";
import { useState } from "react";
function MyApp({ Component, pageProps }: AppProps) {
  const [store] = useState(new RootStore());
  useEthereumEvents(store);
  return (
    <ChakraProvider>
      <MainLayout store={store}>
        <Component {...pageProps} store={store} />
      </MainLayout>
    </ChakraProvider>
  );
}

export default MyApp;
