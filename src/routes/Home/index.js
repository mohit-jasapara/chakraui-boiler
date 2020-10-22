import React, { useMemo } from "react";
import {
  Text,
  Flex,
  Box,
  Heading,
  Button,
  Tag,
} from "@chakra-ui/core";
import { Content } from "../../Components/Content";
import { useRecoilState } from "recoil";
import { hostelsAtom } from "../../atoms/hostels.atom";
import _ from 'lodash'
import {useHistory} from 'react-router-dom'



const Home = (props) => {
  return (
    <Content bg="gray.50">
      <HostelStats />
    </Content>
  );
};

const HostelStats = (props) => {
  const [hostels] = useRecoilState(hostelsAtom);

  const data = useMemo(()=> {
    return hostelsTransform(hostels?.hostels)
  },[hostels.hostels])


  return (
    <>

        <Flex w="100%">
        <Box flex={1} p={5}>
        <Text m={2}>Overview</Text>
        <CardStat data={data} />
        {/* <UserTypeStat/> */}
        </Box>    
        <Box flex={1} p={5} >
          <Text m={2}>Hostels Updates</Text>
          <Box  borderRadius={5}  >
            <Text mt={1} p={4} borderRadius={5} bg="white" fontSize={"md"}>Room G-33 in Shivaji Hostel is alloted to User XXX</Text>
            <Text mt={1} p={4} borderRadius={5} bg="white" fontSize={"md"}>Room F02 in Vivekanand Hostel is alloted to User XXX</Text>
            <Text mt={1} p={4} borderRadius={5} bg="white" fontSize={"md"}>Room R-02 in Mandela Hostel is alloted to User XXX</Text>
            <Text mt={1} p={4} borderRadius={5} bg="white" fontSize={"md"}>Mr. Rajesh Singh has been appointed as new warden for Vivekanand Hostel</Text>

          </Box>
        </Box>
        </Flex>
        <HostelList hostels={data.hostelwise}/>

        </>
  );
};

const HostelList = ({hostels}) => {
  let history = useHistory()
  return (
    <Box mt={5} width="100%"  p={5}>
      <Text>Hostel wise data</Text>
        <hr/>
          <Flex  w="100%" borderRadius={5} my={2}  padding={5}>
                <Box flex={2}>
                <Text size="md" color="gray.600">Hostel</Text>
                </Box>
                <Box flex={1}>
                <Text>For</Text>
                </Box>
                <Box flex={1}>
                <Text>Total Space</Text>
                </Box>

                <Box flex={1}>
                <Text color="red.400">Occupied</Text>
                </Box>

                <Box flex={1}>
                <Text color="green.400">Available</Text>
                </Box>

                <Box flex={1}>
                </Box>

              </Flex>
        {
          hostels?.map(h=> {
            return (
              <Flex w="100%" borderRadius={5} my={2} bg="white" padding={5}>
                <Box flex={2}>
                <Heading size="md" color="gray.600">{h.name}</Heading>
                </Box>
                <Box flex={1}>
                  <Tag size="sm" variant="subtle" colorScheme={h.for === 'boys' ? "green": h.for === "girls" ? "red" : "blue"}>{h.for}</Tag>
                </Box>

                <Box flex={1}>
                <Text>{h.bedcount}</Text>
                </Box>

                <Box flex={1}>
                <Text color="red.400">{h.usedcount}</Text>
                </Box>

                <Box flex={1}>
                <Text color="green.400">{h.unusedcount}</Text>
                </Box>

                <Box flex={1}>
                  <Button size={"sm"} onClick={() => history.push(`hostels/${h.id}`)}>More</Button>
                </Box>

              </Flex>
            )
          })
        }
    </Box>
  )
}

const UserTypeStat = props => {
  return (
    <Box 
        borderRadius={5}
        mt={4}
        bg="white"
        p={4}
        w="50%">
          <Box>
            <Text fontSize="sm" color="text.secondary">Space available by user type</Text>
          </Box>

        <Flex w="100%" mt={4}>

          <Box borderRadius={5} mb={2} bg="red.50" p={3} py={5} flex={1} mx={1}>
            <Heading color="gray.600" size="lg">104</Heading>
            <Text fontSize={"sm"} color={"#b7b7b7"}>Girls (Student)</Text>
          </Box>

          <Box borderRadius={5} mb={2} bg="green.50" p={3} py={5} flex={1} mx={1}>
          <Heading color="gray.600" size="lg">225</Heading>

            <Text fontSize={"sm"} color={"#b7b7b7"}>Boys (Students)</Text>
          </Box>

          <Box borderRadius={5} mb={2} bg="blue.50" p={3} py={5} flex={1} mx={1}>
          <Heading color="gray.600" size="lg">59</Heading>

            <Text fontSize={"sm"} color={"#b7b7b7"}>Staff</Text>
          </Box>


        </Flex>


        </Box>
  )
}

const CardStat = ({data}) => {
  return (
    <Flex  w="100%">
      <Box
        borderRadius={5}
        p={4}
        borderRightWidth={0}
        flex={1}
        pb={20}
        bg="white"
        mr={"3px"}
      >
        <Text color="text.secondary" fontSize="sm">
          Total occupancy
        </Text>
        <Heading color="gray.600" mt={2} size="2xl">{data?.bedcount}</Heading>
      </Box>
      <Flex direction="column" flex={1}>
        <Box mb={"2px"} borderRadius={5} bg="white"  p={4} flex={1}>
          <Text color="text.secondary" fontSize="sm">
            Available space/beds
          </Text>
          <Heading mt={2} color="#55DB73" size="xl">
          {data?.unusedcount}
          </Heading>
        </Box>
        <Box borderRadius={5} borderTopWidth={0} bg="white"  p={4} flex={1}>
          <Text color="text.secondary" fontSize="sm">
            Occupied space/beds
          </Text>
          <Heading mt={2} color="#F24B44" size="xl">
            {data?.usedcount}
          </Heading>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Home;


const hostelsTransform = hostels => {
  if(!hostels){
    return false
  }

  const hostelwise   = hostels.map(h=> {

    let bedcount = 0
    let usedcount = 0
    let unusedcount = 0
    let roomcount = 0
    let roomwithbed = 0

    let usertype = {
      boys:{occ:0, avail:0},
      girls:{occ:0, avail:0},
      staff:{occ:0, avail:0}
    }

    h.floors.forEach(f=> {
      f.rooms.forEach(r=> {
        
        roomcount++
        
        if(r?.beds?.length){
          roomwithbed++
        }
        const foruser = r.for && _.toLower(r.for)
        const user = foruser && usertype[foruser] ? foruser : "boys"     
        
        r.beds.forEach(b=> {
          const userbed = b?.userBeds?.length
          bedcount++
          if(userbed){
            usedcount++
            usertype[user].occ++
          }else{
            unusedcount++
            usertype[user].avail++
          }
        })
      })
    })

    return {
      name: h.name,
      id:h.id,
      for:h.for,
      bedcount,
      usedcount,
      unusedcount,
      roomcount,
      roomwithbed,
      usertype
    }
  })

  const final = {
    hostelwise,
    bedcount: _.sumBy(hostelwise,'bedcount'),
    usedcount: _.sumBy(hostelwise,'usedcount'),
    unusedcount: _.sumBy(hostelwise,'unusedcount'),    
    roomcount: _.sumBy(hostelwise,'roomcount') ,   
    roomwithbed: _.sumBy(hostelwise,'unusedcount')    

  }

  console.log("[dashboard] ", final);
  

  return final
}