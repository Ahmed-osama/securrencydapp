import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { initStore } from "../utils/store.utils";
import { useEthereumEvents } from "../hooks/useEthereumEvents.hook";
import { useState } from "react";
function MyApp({ Component, pageProps }: AppProps) {
  const [store] = useState(initStore());
  useEthereumEvents(store);
  return (
    <ChakraProvider>
      <Component {...pageProps} store={store} />;
    </ChakraProvider>
  );
}

export default MyApp;
