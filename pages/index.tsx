import type { NextPage } from "next";
import RootStore from "../stores/index.store";

const Home: NextPage<{ store: RootStore }> = ({ store }) => {
  return <h1>{store.name}</h1>;
};

export default Home;
