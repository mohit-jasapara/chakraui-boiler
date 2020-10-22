import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/core";

export const Content = ({ isFlex, heading, children, ...rest }) => {
  const Wrap = isFlex ? Flex : Box;
  return (
    <Wrap bg="white" w="100%" h="90vh" p="20px" {...rest}>
      {heading ? (
        <Heading size="lg" mb={1}>
          {heading}
        </Heading>
      ) : null}

      {children}
    </Wrap>
  );
};
