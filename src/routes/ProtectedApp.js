import React, { useEffect } from "react";
import { Flex, Heading, useTheme, Box,  Menu, MenuButton, Button, MenuTransition, Portal, MenuList, MenuItem, Stack, CloseButton, InputGroup, InputLeftElement, Input } from "@chakra-ui/core";
import {  Switch, Route } from "react-router-dom";
import MainContainer from "../Components/Dashboard/MainContainer";
import SideBar, {
  NavIconButton,
} from "../Components/Dashboard/Sidebar";
import Header, { BrandNav } from "../Components/Dashboard/Header";
import {
  SidebarNav,
  SidebarNavItem,
} from "../Components/Dashboard/SidebarItem";
import Home from "./Home";

import {
  Fa500Px,
  FaRegGrinWink,
  FaRegGrinTongue,
} from "react-icons/fa";
import {
  AiOutlineLogout
} from "react-icons/ai";
import Hostel from "./Hostel";
import { useAppContext } from "../App/Context";
import { useHostelListQuery } from "../lib/graphql/user/Queries";
import {  useRecoilValue, useSetRecoilState } from "recoil";
import { hostelsAtom } from "../atoms/hostels.atom";
import SearchUser from "./SearchUser";

import UserProfile from "./UserProfile";
import AddUser from "./AddUser";

import {allCoursesRecoilSelector, departmentsRecoilSelector} from '../atoms/user.atoms'


const AppRoutes = props => {
  const { data, loading} = useHostelListQuery();
  
  useRecoilValue(allCoursesRecoilSelector);
  useRecoilValue(departmentsRecoilSelector);
  const setHostels = useSetRecoilState(hostelsAtom);

  useEffect(()=> {
      setHostels({...data, loading })
  },[data, loading, setHostels])

  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/prot1" component={Test} />
      <Route path="/prot2" component={Test} />      
    </Switch>
  )
}

export default AppRoutes;


const Dashboard = (props) => {

  return (
    <MainContainer>
      <SideBar>

        <Flex flex={1} pt={20} overflow="auto">
          <Box w={"100%"}>
            <SidebarNav root bg='white'>
              <SidebarNavItem title="Home" to="/" icon={<Fa500Px />} />
              <SidebarNavItem
                title="Hostels"
                to="/hostels"
                icon={<FaRegGrinTongue />}
              />
              <SidebarNavItem
                title="Search"
                to="/search"
                icon={<FaRegGrinWink />}
              />
              {/* <SidebarNavItem
                title="Students"
                to="/students"
                icon={<FaRegGrinWink />}
              />
              <SidebarNavItem
                title="Staff"
                to="/staff"
                icon={<FaRegGrinTongue />}
              /> */}
              <SidebarNavItem
                title="Add User"
                to="/add/user"
                icon={<FaRegGrinTongue />}
              />
 
            </SidebarNav>
          </Box>
        </Flex>
      </SideBar>
      <Content/>
    </MainContainer>
  );
};


const Content = (props) => {
const {setAuthenticated} = useAppContext()

  const _logout = () => {
    setAuthenticated(false)
    localStorage.removeItem('@login')
  };

  const theme = useTheme()

  return (
    <Box flex={1} overflowY="auto">
      <Header fixed justifyContent="space-between" alignItems="center">
        <Flex justifyContent='space-between' w='100%'>
          <Box >
          <BrandNav />
            {/* <InputGroup m='20px'>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              <Input type="search" w='500px' borderRadius='20px' placeholder="Search Hostel" />
            </InputGroup> */}
          </Box>
          <Box>
            <NavIconButton icon={<AiOutlineLogout fontSize='30px' color='#5DADE2'/>} onClick={_logout} />
          </Box>
        </Flex>
      </Header>
      <Flex flex={1} pt={theme.metrics.header}>
        <DashboardRoutes/>
      </Flex>
    </Box>
  );
};

const DashboardRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/*/user/:id" component={UserProfile} />
      <Route path="/search" component={SearchUser} /> 
      <Route path="/students" component={Test} />
      <Route path="/staff" component={Home} />
      {/* <Route path="/hostels" component={Hostel} /> */}
      <Route path="/hostels/:id?" component={Hostel} />

      <Route path="/add/user" component={AddUser} />
      <Route path="/user/edit/:id" component={AddUser} />
    </Switch>
  );
};



const Test = (props) => {
  return (
    <Flex flex={1} p={10} justify="space-between" bg={'white'} h="200vh">
      <Heading>Route other</Heading>
      <Stack>
        <MenuView/>
      </Stack>
    </Flex>
  );
};



const MenuView = props => {
  return (
    <Menu eventsEnabled={false}>
  <MenuButton size="sm" as={Button} colorScheme="teal">
    Open menu
  </MenuButton>
  <MenuTransition>
    {(styles) => (
      <Portal>

      <MenuList sx={styles}>
        <MenuItem command="⌘T">New Tab</MenuItem>
        <MenuItem command="⌘N">New Window</MenuItem>
        <MenuItem command="⌘⇧N">Open Closed Tab</MenuItem>
        <MenuItem command="⌘O">Open File...</MenuItem>
      </MenuList>
      </Portal>
    )}
  </MenuTransition>
</Menu>
  )
}
