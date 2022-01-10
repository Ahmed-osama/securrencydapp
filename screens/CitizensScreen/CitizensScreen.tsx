import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import RootStore from "../../stores/index.store";
import _map from "lodash/map";
import { useCitizensFetch } from "../../hooks/useCitizensFetch.hook";
import { useCitizensState } from "../../hooks/useCitizensState.hook";

const CitizensScreen = ({ store }: { store: RootStore }) => {
  useCitizensFetch(store);
  const {
    currentPage,
    totalCount,
    paginationList,
    displayedPaginationList,
    displayedCitizens,
    setPage,
  } = useCitizensState(store);
  console.log(displayedCitizens);
  return (
    <Container maxW="container.lg">
      <Heading mt={5} mb={5}>
        Citizens List
      </Heading>
      <Table variant="simple" mb={10}>
        <Thead>
          <Tr>
            <Th>id</Th>
            <Th>name</Th>
            <Th isNumeric>age</Th>
            <Th>city</Th>
          </Tr>
        </Thead>
        <Tbody>
          {_map(displayedCitizens, ({ id, name, age, city }) => {
            return (
              <Tr key={id}>
                <Td>{id}</Td>
                <Td>{name}</Td>
                <Td isNumeric>{age}</Td>
                <Td>city</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>

      <Stack spacing={4} direction="row" align="center" justify={"center"}>
        {_map(displayedPaginationList, (page) => {
          return (
            <Button
              colorScheme={currentPage === page ? "teal" : "gray"}
              size={"sm"}
              key={page}
              onClick={() => setPage(page)}
            >
              {page + 1}
            </Button>
          );
        })}
      </Stack>
    </Container>
  );
};

export default CitizensScreen;
