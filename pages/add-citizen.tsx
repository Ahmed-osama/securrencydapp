import { Box, Container, Flex, Heading } from "@chakra-ui/react";

import AddCitizenScreen from "../screens/AddCitizenScreen/AddCitizenScreen";
import type { NextPage } from "next";
import RootStore from "../stores/index.store";
import { useCitizensFetch } from "../hooks/useCitizensFetch.hook";

const AddCitizen: NextPage<{ store: RootStore }> = ({ store }) => {
  return <AddCitizenScreen store={store} />;
};

export default AddCitizen;
