import AddCitizenScreen from "../screens/AddCitizenScreen/AddCitizenScreen";
import type { NextPage } from "next";
import RootStore from "../stores/index.store";

const AddCitizen: NextPage<{ store: RootStore }> = ({ store }) => {
  return <AddCitizenScreen store={store} />;
};

export default AddCitizen;
