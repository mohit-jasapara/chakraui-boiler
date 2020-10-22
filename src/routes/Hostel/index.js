import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  List,
  ListItem,
  Skeleton,
  Text,
} from "@chakra-ui/core";
import { useRecoilState } from "recoil";
import { hostelsAtom } from "../../atoms/hostels.atom";
import {  AiOutlineRight } from "react-icons/ai";
import { Content } from "../../Components/Content";
import { HostelRooms } from "./HostelDetails";
import {useHistory, useParams} from 'react-router-dom'
import _ from 'lodash'

export default () => {
  const [selectedHostel, selectHostel] = useState("");
  const params = useParams()

  const [hostels] = useRecoilState(hostelsAtom);

  useEffect(()=> {
    if(params.id){
      selectHostel( _.find(hostels.hostels, h=> h.id === params.id))
    }
  },[params.id, hostels])


  return (
    <Content isFlex p={0}>
      <Flex flex={2}>
        <HostelList
          selectedHostel={selectedHostel}
          selectHostel={(hostel) => selectHostel(hostel)}
        />
      </Flex>
      <Flex flex={8} overflow="auto" h="90vh">
        <HostelRooms hostel={selectedHostel} />
      </Flex>
    </Content>
  );
};

const HostelList = (props) => {
  const [hostels] = useRecoilState(hostelsAtom);

  const history = useHistory()
  return (
    <List
      w="100%"
      bg="#F7F6F4"
      className="black-scroller"
      overflowY="auto"
      h="100%"
    >
      <Flex alignItems="center" p={5} bg="white">
        <Box>
          <Heading size="md">Hostels</Heading>
          <Text fontSize="xs" color="text.secondary">
            {"Select a hostel to view details"}
          </Text>
        </Box>
      </Flex>

      <Skeleton isLoaded={!hostels.loading}>
        {hostels.hostels ? (
          hostels.hostels.map((hostel) => {
            const isActive =
              props.selectedHostel && props.selectedHostel.id == hostel.id;
            return (
              <ListItem
                p={5}
                m={1}
                key={hostel.id}
                cursor="pointer"
                role="group"
                _hover={{
                  background: "#EaEaEb",
                  color: "initial",
                }}
                color={isActive ? "primary" : "initial"}
                sx={
                  isActive
                    ? {
                        position: "sticky",
                        top: 1,
                        background: "white",
                        borderRadius: 5,
                        //   background:
                        //     "-webkit-linear-gradient(to right, #43C6AC, #85D8CE)" /* Chrome 10-25, Safari 5.1-6 */,
                        //   background:
                        //     "linear-gradient(to right, #43C6AC, #85D8CE)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
                      }
                    : {}
                }
                bg={"#F7F6F4"}
                //mb={1}
                onClick={() => history.push('/hostels/'+hostel.id)}
                border="0px solid #eaeaea"
              >
                <Flex justifyContent="space-between">
                  <Heading
                    fontSize={"md"}
                    fontWeight={isActive ? "bold" : "500"}
                  >
                    {hostel.name}
                  </Heading>
                  {isActive ? (
                    <AiOutlineRight ml="10px" fontSize="20px" />
                  ) : null}
                </Flex>
                <Box
                  color={isActive ? "text.secondary" : "gray.400"}
                  _groupHover={{ color: "gray.400" }}
                >
                  <Text fontSize="sm">{hostel.name}</Text>
                </Box>
              </ListItem>
            );
          })
        ) : (
          <Text fontSize="lg" p={5} color="gray.500">
            No Hostels Available
          </Text>
        )}
      </Skeleton>
    </List>
  );
};
