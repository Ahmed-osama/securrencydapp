import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Container,
  Flex,
  Heading,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Tr,
} from "@chakra-ui/react";

import RootStore from "../../stores/index.store";
import { isLoading } from "../../utils/store.utils";
import { useSelectedCitizenFetch } from "../../hooks/useSelectedCitizenFetch.hook";
import { useSelectedCitizenState } from "../../hooks/useSelectedCitizenState.hook";

const SelectedCitizenScreen = ({ store }: { store: RootStore }) => {
  useSelectedCitizenFetch(store);
  const { selectedCitizen, isConnected, selectedCitizenState, currentAccount } =
    useSelectedCitizenState(store);
  const isSelectedPersonLoading = isLoading(selectedCitizenState);
  console.log("SelectedCitizenScreen -> selectedCitizen", selectedCitizen);
  console.log(
    "SelectedCitizenScreen -> isSelectedPersonLoading",
    isSelectedPersonLoading
  );
  console.log(
    "SelectedCitizenScreen -> selectedCitizenState",
    selectedCitizenState
  );
  return (
    <Container
      maxW="container.lg"
      minH={"90vh"}
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
    >
      {!isConnected ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>no connected!</AlertTitle>
          <AlertDescription>
            you need to be connected to Preview this citizen
          </AlertDescription>
        </Alert>
      ) : (
        <Flex
          flexDirection="column"
          justifyContent={"space-between"}
          mb={5}
          mt={5}
        >
          <Heading as="h1" size={"md"} mb={2}>
            Citizens List
          </Heading>

          {isSelectedPersonLoading ? (
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              minH={"200px"}
            >
              <Spinner color="teal" />
            </Flex>
          ) : (
            <Table variant="simple" mb={10} shadow="base">
              <Tbody>
                <Tr key={"id"}>
                  <Th>id</Th>
                  <Td>{selectedCitizen?.id}</Td>
                </Tr>
                <Tr key={"name"}>
                  <Th>name</Th>
                  <Td>{selectedCitizen?.name}</Td>
                </Tr>
                <Tr key={"age"}>
                  <Th>age</Th>
                  <Td>{selectedCitizen?.age}</Td>
                </Tr>
              </Tbody>
            </Table>
          )}
        </Flex>
      )}
    </Container>
  );
};

export default SelectedCitizenScreen;
