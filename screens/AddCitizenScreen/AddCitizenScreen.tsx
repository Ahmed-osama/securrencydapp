import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  Container,
  Flex,
  Heading,
  Input,
  Spinner,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";

import RootStore from "../../stores/index.store";
import _get from "lodash/get";
import { isLoading } from "../../utils/store.utils";
import { useAddCitizenState } from "../../hooks/useAddCitizenState.hook";
import { useCitizensFetch } from "../../hooks/useCitizensFetch.hook";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

const AddCitizenScreen = ({ store }: { store: RootStore }) => {
  useCitizensFetch(store);
  const { addCitizen, currentAccount, isConnected, addCitizenState } =
    useAddCitizenState(store);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toast = useToast();
  const isAddCitizenLoading = isLoading(addCitizenState);
  const router = useRouter();
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
        <Heading as="h1" size={"md"}>
          Add Citizen
        </Heading>
      </Flex>

      {!isConnected ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>no connected!</AlertTitle>
          <AlertDescription>
            you need to be connected to add new citizen
          </AlertDescription>
          {/* <CloseButton position="absolute" right="8px" top="8px" /> */}
        </Alert>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit((formData) => {
              addCitizen({
                ...formData,
                sender: currentAccount,
                successHandler(data: any) {
                  console.log(data);
                  toast({
                    title: "Citizen created.",
                    description: "We've created citizen successfully.",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                  });
                  router.push(
                    `/${_get(data, "events.Citizen.returnValues.id")}`
                  );
                },
                errorHandler(err: any) {
                  console.log(err);
                  toast({
                    title: "Failure",
                    description: "failed to create citizen",
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                  });
                },
              });
            })(e);
          }}
        >
          <Flex
            shadow="base"
            flexDirection="row"
            flexWrap="wrap"
            p={5}
            pt={10}
            pb={10}
          >
            <Flex flexDirection="column" flexBasis="33.33%" ps={5} pe={5}>
              <Text mb={2} as="label" htmlFor="name-input" fontWeight="bold">
                Name
              </Text>
              <Input
                disabled={isAddCitizenLoading}
                id="name-input"
                type="text"
                label="Name"
                {...register("name", { required: "name is required field" })}
                isInvalid={errors?.name}
              />
              {errors?.name && (
                <Text mt={1} as="span" color="tomato" fontSize={"12px"}>
                  {errors?.name?.message}
                </Text>
              )}
            </Flex>
            <Flex flexDirection="column" flexBasis="33.33%" ps={5} pe={5}>
              <Text mb={2} as="label" htmlFor="age-input" fontWeight="bold">
                age
              </Text>
              <Input
                disabled={isAddCitizenLoading}
                id="age-input"
                type="number"
                label="age"
                {...register("age", { required: "age is required field" })}
                isInvalid={errors?.age}
              />
              {errors?.age && (
                <Text mt={1} as="span" color="tomato" fontSize={"12px"}>
                  {errors?.age?.message}
                </Text>
              )}
            </Flex>
            <Flex flexDirection="column" flexBasis="33.33%" ps={5} pe={5}>
              <Text mb={2} as="label" htmlFor="city-input" fontWeight="bold">
                city
              </Text>
              <Input
                disabled={isAddCitizenLoading}
                id="city-input"
                type="text"
                label="city"
                {...register("city", { required: "city is required field" })}
                isInvalid={errors?.city}
              />
              {errors?.city && (
                <Text mt={1} as="span" color="tomato" fontSize={"12px"}>
                  {errors?.city?.message}
                </Text>
              )}
            </Flex>
            <Flex flexDirection="column" flexBasis="100%" ps={5} pe={5} mt={5}>
              <Text mb={2} as="label" htmlFor="city-input" fontWeight="bold">
                someNote
              </Text>
              <Textarea
                id="someNote-input"
                type="text"
                label="someNote"
                {...register("someNote", {
                  required: "someNote is required field",
                })}
                isInvalid={errors?.someNote}
              />
              {errors?.someNote && (
                <Text mt={1} as="span" color="tomato" fontSize={"12px"}>
                  {errors?.someNote?.message}
                </Text>
              )}
            </Flex>
            <Flex flexDirection="column" flexBasis="100%" ps={5} pe={5} mt={5}>
              <Button
                type="submit"
                colorScheme={"teal"}
                disabled={isAddCitizenLoading}
              >
                {!isAddCitizenLoading ? "Add Citizen" : <Spinner />}
              </Button>
            </Flex>
          </Flex>
        </form>
      )}
    </Container>
  );
};

export default AddCitizenScreen;
