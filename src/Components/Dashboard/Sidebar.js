import React from "react";
import { Box, Flex, Heading, IconButton, useTheme } from "@chakra-ui/core";
import {ArrowRightIcon} from '@chakra-ui/icons'

const SideBar = (props) => {
  const theme = useTheme();  
  return (
    <Flex
      direction="column"
      w={[0, 0, 0, theme.metrics.sidebar]}
      h={"100vh"}
      borderRight="1px"
    borderColor="gray.200"
      bg={"white"}
    >
      {props.children}
    </Flex>
  );
};

export default SideBar;

export const SidebarToggleBtn = (props) => {
  return <NavIconButton icon={<ArrowRightIcon/>} />;
};

export const NavIconButton = ({ icon, ...rest }) => {
  const theme = useTheme();

  return (
    <IconButton
      h={theme.metrics.header}
      w={theme.metrics.header}
      color={"gray.400"}
      fontSize={theme.fontSizes["xl"]}
      style={{ aspectRatio: 1, borderRadius: 0 }}
      bg={"transparent"}
      icon={icon}
      {...rest}
    />
  );
};


//example sidebar
// return (
//   <MainContainer>
//     <SideBar>
//       <BrandNav />

//       <Flex flex={1} overflow="auto">
//         <Box w={"100%"}>
//           <SidebarNav root bg='white'>
//             <SidebarNavItem title="Home" to="/" icon={<Fa500Px />} />
//             <SidebarNavItem
//               title="Profile"
//               to="/route2"
//               icon={<FaRegGrinWink />}
//             />
//             <SidebarNavItem
//               title="Components"
//               to="/route3"
//               icon={<FaRegGrinTongue />}
//             />

//             <SidebarNav title={"Group 1"} icon={<FaRegGem />}>
//               <SidebarNavItem
//                 title="sRoute 1"
//                 to="/route4"
//                 icon={<FaRegHandPeace />}
//               />
//               <SidebarNavItem title="sRoute 2" icon={<FaRegHeart />} />
//               <SidebarNavItem title="sRoute 3" icon={<FaRegSnowflake />} />

//               <SidebarNav title={"Sub Group 1"} icon={<FaRegCommentDots />}>
//                 <SidebarNavItem title="ssRoute 1" icon={<FaCrosshairs />} />
//                 <SidebarNavItem title="ssRoute 2" icon={<FaCrosshairs />} />
//                 <SidebarNavItem title="ssRoute 3" icon={<FaCrosshairs />} />
//               </SidebarNav>
//             </SidebarNav>
//           </SidebarNav>
//         </Box>
//       </Flex>
//     </SideBar>
//     <Content />
//   </MainContainer>
// );