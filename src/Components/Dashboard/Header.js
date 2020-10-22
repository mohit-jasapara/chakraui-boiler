import React from "react";
import { Flex, Heading, Box, useTheme } from "@chakra-ui/core";
import Color from "color";

const Header = ({ fixed, children, ...rest }) => {
  const theme = useTheme();

  let positionStyle = fixed
    ? { position: "fixed", zIndex: 100, top: 0,  right: 0 }
    : {left:0};
  return (
    <Flex
      h={theme.metrics.header}
      borderBottom="1px"
    borderColor="gray.200"
      left={[0,0,0,theme.metrics.sidebar]}
      {...rest}
      style={positionStyle}
      bg={'white'}
    >
      {children}
    </Flex>
  );
};

export default Header;

export const BrandNav = (props) => {
  const theme = useTheme()
  return (
    <Flex
      paddingX={10}
      direction="column"
      alignItems="center"
      justifyContent="center"
      h={theme.metrics.header}
    >
      <Heading color="gray.700" fontSize="xl">NIMS</Heading>
    </Flex>
  );
};
