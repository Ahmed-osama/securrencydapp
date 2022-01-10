import {
  ArrowBackIcon,
  ArrowForwardIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Link as CHLink,
  Container,
  Flex,
  Heading,
  Stack,
  Table,
  TableCaption,
  TagLeftIcon,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import Link from "next/link";
import RootStore from "../../stores/index.store";
import _map from "lodash/map";
import { useCitizensFetch } from "../../hooks/useCitizensFetch.hook";
import { useCitizensState } from "../../hooks/useCitizensState.hook";

const CitizensScreen = ({ store }: { store: RootStore }) => {
  useCitizensFetch(store);
  const {
    currentPage,
    totalCount,
    displayedPaginationList,
    displayedCitizens,
    setPage,
    lastPage,
    toTheBeginning,
    toTheEnd,
    nextPage,
    prevPage,
  } = useCitizensState(store);
  return (
    <Container
      maxW="container.lg"
      minH={"90vh"}
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
    >
      <Flex
        flexDirection="row"
        justifyContent={"space-between"}
        mb={5}
        alignItems="center"
        mt={5}
      >
        <Heading as="h1" size={"md  "}>
          Citizens List
        </Heading>
        <Heading as="h1" size={"sm"}>
          total records : {totalCount}
        </Heading>
      </Flex>
      <Table variant="simple" mb={10} shadow="base">
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
                <Td>
                  <Link href={`/${id}`} passHref>
                    <CHLink>{name}</CHLink>
                  </Link>
                </Td>
                <Td isNumeric>{age}</Td>
                <Td>city</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>

      <Stack spacing={4} direction="row" align="center" justify={"center"}>
        {currentPage != 0 && (
          <Button
            colorScheme={"gray"}
            size={"sm"}
            key={"ArrowBackIcon"}
            onClick={toTheBeginning}
          >
            <ArrowBackIcon />
          </Button>
        )}
        {currentPage != 0 && (
          <Button
            colorScheme={"gray"}
            size={"sm"}
            key={"ChevronLeftIcon"}
            onClick={prevPage}
          >
            <ChevronLeftIcon />
          </Button>
        )}
        {_map(displayedPaginationList, (page) => {
          console.log(currentPage, page);
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

        {currentPage != lastPage && (
          <Button
            colorScheme={"gray"}
            size={"sm"}
            key={"start"}
            onClick={nextPage}
          >
            <ChevronRightIcon />
          </Button>
        )}
        {currentPage != lastPage && (
          <Button
            key="ArrowForwardIcon"
            colorScheme={"gray"}
            size={"sm"}
            onClick={toTheEnd}
          >
            <ArrowForwardIcon />
          </Button>
        )}
      </Stack>
    </Container>
  );
};

export default CitizensScreen;
