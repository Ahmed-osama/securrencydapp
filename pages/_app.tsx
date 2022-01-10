import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import { initStore } from "../utils/store.utils";
import { useState } from "react";
function MyApp({ Component, pageProps }: AppProps) {
  const [store] = useState(initStore());

  return (
    <ChakraProvider>
      <MainLayout store={store}>
        <Component {...pageProps} store={store} />
      </MainLayout>
    </ChakraProvider>
  );
}

export default MyApp;
