import { Box, Container, Flex, Heading } from "@chakra-ui/react";

import AddCitizenScreen from "../screens/AddCitizenScreen/AddCitizenScreen";
import type { NextPage } from "next";
import RootStore from "../stores/index.store";
import { useCitizensFetch } from "../hooks/useCitizensFetch.hook";

const Citze: NextPage<{ store: RootStore }> = ({ store }) => {
  useCitizensFetch(store);
  return (
    <Container maxW="container.lg">
      <Flex
        flexDirection="row"
        justifyContent={"space-between"}
        mb={5}
        alignItems="center"
        mt={5}
      >
        <Heading as="h1" size={"lg"}>
          single citizen
        </Heading>
      </Flex>
      <Box shadow="base"></Box>
    </Container>
  );
};

export default Citze;
