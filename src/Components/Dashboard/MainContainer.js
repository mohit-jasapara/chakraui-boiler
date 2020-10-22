import React, { useMemo, useState } from "react";
import { Box, Flex } from "@chakra-ui/core";
import ContainerContext from "./Context";

const MainContainer = (props) => {
  const contextValue = useMemo(() => ({}), []);

  return (
    <ContainerContext.Provider value={contextValue}>
      <Flex w={"100%"} h={"100vh"} bg={"gray.50"}>
        {props.children}
      </Flex>
    </ContainerContext.Provider>
  );
};

export default MainContainer;
