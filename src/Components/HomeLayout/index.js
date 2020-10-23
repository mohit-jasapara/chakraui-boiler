import { Box, Flex, Stack, useTheme } from "@chakra-ui/core";
import React, { useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { Fa500Px, FaRegGrinTongue, FaRegGrinWink } from "react-icons/fa";
import { Switch, Route } from "react-router-dom";
import { useAppContext } from "../../App/Context";
import Home from "../../routes/Home";
import Header, { BrandNav } from "./Header";
import MainContainer from "./MainContainer";
import SideBar, { NavIconButton } from "./Sidebar";
import { SidebarNav, SidebarNavItem } from "./SidebarItem";

const Dashboard = (props) => {

    return (
      <MainContainer>
        <SideBar>
  
          <Flex flex={1} pt={20} overflow="auto">
            <Box w={"100%"}>
              <SidebarNav root bg='white'>
                <SidebarNavItem title="Home" to="/" icon={<Fa500Px />} />
                <SidebarNavItem
                  title="Item1"
                  to="/item1"
                  icon={<FaRegGrinTongue />}
                />
                <SidebarNavItem
                  title="Item2"
                  to="/item2"
                  icon={<FaRegGrinWink />}
                />
              </SidebarNav>
            </Box>
          </Flex>
        </SideBar>
        <Content/>
      </MainContainer>
    );
};

export default Dashboard

const Content = (props) => {
    const {setAuthenticated} = useAppContext()
    
      const _logout = () => {
        setAuthenticated(false)
        sessionStorage.removeItem('@login')
      };
    
      const theme = useTheme()
    
      return (
        <Box flex={1} overflowY="auto">
          <Header fixed justifyContent="space-between" alignItems="center">
            <Flex justifyContent='space-between' w='100%'>
              <Box >
              <BrandNav />
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
          <Route exact path="/item1" component={Test} />
          <Route exact path="/item2" component={Test} />
        </Switch>
      );
    };
    
    
    
    const Test = (props) => {
      return (
        <Flex flex={1} p={10} justify="space-between" bg={'white'} h="200vh">
          <Stack>
            <div>Test Component</div>
          </Stack>
        </Flex>
      );
    };