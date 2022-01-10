import { FC, ReactChild } from "react";

import Header from "../../components/Header/Header";
import RootStore from "../../stores/index.store";
import { useEthereumEvents } from "../../hooks/useEthereumEvents.hook";
import { useInitApplication } from "../../hooks/useInitApplication.hook";

const MainLayout: FC<{ store: RootStore }> = ({ children, store }) => {
  useEthereumEvents(store);
  useInitApplication(store);
  return (
    <main>
      <Header store={store} />
      {children}
    </main>
  );
};

export default MainLayout;
