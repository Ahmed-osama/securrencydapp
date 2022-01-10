import type { NextPage } from "next";
import RootStore from "../stores/index.store";
import SelectedCitizenScreen from "../screens/SelectedCitizenScreen/SelectedCitizenScreen";

const Citizen: NextPage<{ store: RootStore }> = ({ store }) => {
  return <SelectedCitizenScreen store={store} />;
};

export default Citizen;
