import React from "react";
import { Flex, Heading, Button, useToast, Stack } from "@chakra-ui/core";



const Home = (props) => {
  const toast = useToast();

  return (
      <Flex flex={1} p={5} justify="space-between" bg={'white'} h="200vh">
      <Heading>Hostel FACILITIES</Heading>
      <Stack>

      </Stack>
    </Flex>
  );
};

export default Home;
