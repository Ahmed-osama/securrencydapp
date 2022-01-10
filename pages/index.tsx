import CitizensScreen from "../screens/CitizensScreen/CitizensScreen";
import type { NextPage } from "next";
import RootStore from "../stores/index.store";

const Home: NextPage<{ store: RootStore }> = ({ store }) => {
  return <CitizensScreen store={store} />;
};

export default Home;
