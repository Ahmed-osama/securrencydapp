import { FC, ReactChild } from "react";

import Header from "../../components/Header/Header";
import RootStore from "../../stores/index.store";

const MainLayout: FC<{ store: RootStore }> = ({ children, store }) => {
  return (
    <main>
      <Header store={store} />
      {children}
    </main>
  );
};

export default MainLayout;
