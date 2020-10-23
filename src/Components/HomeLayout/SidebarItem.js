import React, { useState, useRef } from "react";
import { motion, useCycle, AnimatePresence } from "framer-motion";
import { useTheme, PseudoBox, Flex, Box } from "@chakra-ui/core";
import Color from "color";
import { Link, useLocation, matchPath } from "react-router-dom";
import {ChevronRightIcon} from '@chakra-ui/icons'


const variantsmenu = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: -20,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export const SidebarNavItem = ({ icon, title, to, opened, chevron }) => {
  const theme = useTheme();
  // const sidebarcolor = theme.colors.sidebar.bg;
  const location = useLocation();
  const isActive = matchPath(to, { path: location.pathname, exact: true });


  const navicon =
    typeof icon === "function"
      ? icon()
      : React.isValidElement(icon)
      ? icon
      : undefined;

  const RouteLink = to ? Link : "a";
  return (
    <motion.li
      initial="closed"
      animate="open"
      exit="closed"
      variants={variantsmenu}
      style={{
        borderLeft: isActive && `3px solid ${theme.colors.orange[300]}`,
        color:  theme.colors.gray[800],
        //backgroundColor: opened
        //  ? Color(sidebarcolor).darken(0.2).hex()
        //  : isActive
        //  ? Color(sidebarcolor).darken(0.6).hex()
        //  : sidebarcolor,
      }}
    >
      <motion.div
        whileHover={{
          x: 3,
          color: 'black'
        }}
        whileTap={{ scale: 0.99 }}
      >
        <RouteLink
          style={{
            fontSize: theme.fontSizes.sm,
            fontWeight: theme.fontWeights.medium,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 10,
            paddingLeft: 20,
          }}
          to={to}
        >
          <Flex alignItems="center" fontWeight={isActive ? "bold" :"400"} fontSize="md">
            <Box w={8}>{navicon}</Box>
            {title}
          </Flex>
          {chevron ? (
            <motion.div animate={{ rotate: opened ? 90 : 0 }}>
            <ChevronRightIcon/>

</motion.div>
          ) : null}
        </RouteLink>
        {/* <Text userSelect="none">{title}</Text> */}
        {/* used for list header */}
      </motion.div>
    </motion.li>
  );
};

export const SidebarNav = ({ children, icon, title, root }) => {
  const [isOpen, toggleOpen] = useState(title ? false : true);
  const containerRef = useRef(null);
  // const { height } = useDimensions(containerRef);

  return (
    <nav ref={containerRef}>
      {title ? (
        <div onClick={() => toggleOpen((o) => (o ? false : true))}>
          <SidebarNavItem icon={icon} opened={isOpen} chevron title={title} />
        </div>
      ) : null}

      <AnimatePresence initial={title ? false : true}>
        {isOpen ? (
          <motion.ul
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: {
                opacity: 1,
                height: "auto",
                transition: { staggerChildren: 0.07, delayChildren: 0.2 },
              },
              collapsed: {
                opacity: 0,
                height: 0,
                transition: {
                  duration: 0.3,
                  staggerChildren: 0.05,
                  staggerDirection: -1,
                },
              },
            }}
            transition={{ duration: 0.3 }}
            style={{ paddingLeft: title ? 10 : 5, listStyle: "none" }}
          >
            {children}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </nav>
  );
};
