import React from "react";
import { Menu } from "@chakra-ui/core";

export const MenuWrapper = ({ trigger, children }) => {
  return (
    <Menu>
      {({ isOpen }) => {
        return (
          <>
            {trigger}
            {isOpen ? children : null}
          </>
        );
      }}
    </Menu>
  );
};
