import React, { useMemo, useContext, useEffect } from "react";
import {
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  PopoverFooter,
  Text,
  Box,
  Flex,
  Heading,
  Collapse,
  PopoverCloseButton,
  Avatar,
  Tag, Tabs, TabList, Tab, TabPanels, TabPanel, Stack, Skeleton, Icon, Tooltip
} from "@chakra-ui/core";
import { Gi3DStairs } from "react-icons/gi";
import { AiOutlineDown, AiOutlineTeam } from "react-icons/ai";
import { useSearchUserQuery } from "../../lib/graphql/user/Queries";
import { StudentsList } from "../SearchUser";
import { BsPeople } from "react-icons/bs";
import { BiBed } from "react-icons/bi";
import {useHistory} from 'react-router-dom'

const SelectContext = React.createContext();

export const HostelRooms = ({ hostel, selectMode, onSelect }) => {
  const [getUsers, {data:users, loading}] = useSearchUserQuery({})

  useEffect(() => {
    if(hostel?.id){
      getUsers({ variables: { data: {hostelId:parseInt(hostel.id), searchKey:'name', searchQuery:''} }})
    }
  }, [hostel])

  const contextValue = useMemo(
    () => ({
      hostel,
      selectMode,
      onSelect,
    }),
    [hostel, selectMode, onSelect]
  );

  return hostel ? (
    <SelectContext.Provider value={contextValue}>
      <Box p={6} w="100%">
      <Heading fontSize='25px' color='teal.500'>{hostel?.name}</Heading>
      <br/>
      <Tabs>
        <TabList>
          <Tab>ROOMS</Tab>
          <Tab>USERS</Tab>
          <Tab>INFORMATION</Tab>
        </TabList>

        <TabPanels>
          
          <TabPanel>
            <br/>
            <Rooms hostel={hostel}/>
          </TabPanel>
          
          <TabPanel>
            <br/>
            <Heading size="md">USERS</Heading>
            <br/>
            {loading ? 
              <Stack>
                <Skeleton height="20px" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />
              </Stack>
              :
              <StudentsList hideHostel users={users?.searchUser}/>
            }
          </TabPanel>

          <TabPanel>
            <br/>
            <Flex>
              <StatisticsCard stats='300' title='Total Beds' icon={BiBed}/>
              <StatisticsCard stats='198' title='Occupied Beds' icon={AiOutlineTeam}/>
              <StatisticsCard stats='98' title='Available Beds' icon={BiBed}/>
            </Flex>
            <Flex p={4} m={3} justifyContent='space-between' boxShadow='0 10px 40px 0 rgba(62,57,107,.07), 0 2px 9px 0 rgba(62,57,107,.06)' w='80%'>
              <Box>
                <Text fontSize='sm' color='#95A5A6'>Wardens</Text>
                <Text fontSize='md'>Dharmendra, Kuldeep, Rajesh</Text>
              </Box>
            </Flex>
            <Flex p={4} m={3} justifyContent='space-between' boxShadow='0 10px 40px 0 rgba(62,57,107,.07), 0 2px 9px 0 rgba(62,57,107,.06)' w='80%'>
              <Box>
                <Text fontSize='sm' color='#95A5A6'>Staff</Text>
                <Text fontSize='md'>Ramesh, Suresh, Prakash</Text>
              </Box>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
        
      </Box>
    </SelectContext.Provider>
  ) : (
    <Box p={8}>Select a hostel first</Box>
  );
};

const StatisticsCard = ({stats, icon, title}) => {
  return(
    <Flex p={4} m={3} justifyContent='space-between' boxShadow='0 10px 40px 0 rgba(62,57,107,.07), 0 2px 9px 0 rgba(62,57,107,.06)' w='20%'>
        <Box>
          <Icon as={icon} color='orange.500' boxSize={8}/>
        </Box>
        <Box textAlign='right'>
          <Text fontSize='xl'>{stats}</Text>
          <Text fontSize='sm' color='#95A5A6'>{title}</Text>
        </Box>
    </Flex>
  )
}

const Rooms = ({hostel}) => {
  const bg = "#FFC9D0"
  return(
    <>
      <Flex w="100%">
        <Flex justifyContent='space-between' alignItems='center' w='100%'>
          <Heading size="md">FLOORS</Heading>
          <Flex alignItems='center'>
            <SampleRoom bg={"#white"} title='Available'/>
            <SampleRoom bg={"#FFC9D0"} title='Occupied'/>
            <SampleRoom bg={"#CBCBCB"} title='Not Available'/>
          </Flex>
        </Flex>
      </Flex>
      <br />
      {hostel?.floors?.length ? (
        hostel.floors.map((floor, indx) => (
          <SingleFloor key={floor.id} indx={indx} floor={floor} />
        ))
      ) : (
        <Heading fontSize="sm" m={4}>No Floors Added</Heading>
      )}
    </>
  )
}

const SampleRoom = ({bg, title}) => {
  return(
    <Flex mx={3} alignItems='center'>
      <Box border="1px solid #989898" bg={bg} height={15} width={31}></Box>
      <Text ml={1} fontSize="xs">{title}</Text>
    </Flex>
  )
}

const SingleFloor =   ({ floor, indx }) => {
  const { selectMode } = useContext(SelectContext);

  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: selectMode ? true : indx !== 0 ? false : true,
  });

  const rooms = floor.rooms.length;
  return (
    <Box w="100%" border="1px solid #38354F1A" mb={5} borderRadius="4px">
      <Flex
        p={2}
        borderBottom="1px solid #38354F1A"
        w="100%"
        justifyContent="space-between"
        cursor="pointer"
        onClick={onToggle}
      >
        <Flex>
          <Gi3DStairs fontSize="25px" style={{ color: "#cacaca" }} />
          <Text ml="10px">{floor.name}</Text>
        </Flex>
        <Box>
          <AiOutlineDown fontSize="20px" />
        </Box>
      </Flex>
      <Collapse mt={4} isOpen={isOpen}>
        <Flex p={2} flexWrap="wrap">
          {rooms ? (
            floor.rooms.map((room) => <Room key={room.id} room={room} />)
          ) : (
            <Heading fontSize="sm" m={4}>No Rooms Added</Heading>
          )}
        </Flex>
      </Collapse>
    </Box>
  );
};

const Room = (props) => {
  const room = props.room;

  return (
    <RoomPopOver room={room}>
      <Box textAlign="center" mx={2} my={2}>
        <Flex
          border="1px solid #989898"
          _hover={{
            borderWidth: "2px",
            borderColor: "accent",
          }}
          bg={!room.beds.length ? "#CBCBCB" : ""}
          height={45}
          width={61}
          position="relative"
        >
          {room.beds.length
            ? room.beds.map((bed) => (
                <Bed key={bed.id} flex={1 / room.beds.length} bed={bed} />
              ))
            : null}
          {room.type === "AC_DOUBLE" ? <AcIcon /> : null}
        </Flex>
        <Text fontSize="xs">{props.room.name}</Text>
      </Box>
    </RoomPopOver>
  );
};

function RoomPopOver({ children, room }) {
  const { selectMode, hostel, onSelect } = useContext(SelectContext);

  return (
    <Popover
      trigger={selectMode ? "click" : "hover"}
      gutter="0"
      closeOnBlur={true}
    >
      {({ isOpen, onClose }) => {
        return (
          <>
            <PopoverTrigger>{children}</PopoverTrigger>
            {isOpen ? (
              selectMode ? (
                <RoomSelectPopOver
                  room={room}
                  hostel={hostel}
                  onSelect={onSelect}
                />
              ) : (
                <RoomInfoPopOver room={room} />
              )
            ) : null}
          </>
        );
      }}
    </Popover>
  );
}

const RoomSelectPopOver = ({ room, hostel, onSelect }) => {
  return (
    <PopoverContent
      zIndex={99999}
      sx={{
        boxShadow: "5px 5px 15.82px 1.18px rgba(191, 195, 207, 0.39)",
      }}
    >
      <PopoverCloseButton />

      <Flex p={3} w="100%" alignItems="center" justify="space-between">
        <Box>
          <Heading size="sm" fontWeight="bold" border="0">
            {room.name}
          </Heading>
          <Text color="green.600">{room.type}</Text>
        </Box>
        <Box></Box>
      </Flex>
      <PopoverArrow />
      <PopoverBody>
        {room.beds?.length ? (
          <Box>
            <Text fontSize="xs" color="gray.400">
              Select a Bed
            </Text>
            <Flex w="100%" flexWrap="wrap">
              {room.beds.map((b, i) => {
                const userBed = b.userBeds?.length && b.userBeds?.[0];

                const _onSelect = () => {
                  onSelect(b, { name: room.name, id: room.id }, hostel);
                };
                return (
                  <Box
                    p={2}
                    m={1}
                    onClick={!userBed && _onSelect}
                    border="1px solid #dadada"
                    borderColor={userBed ? "gray.300" : "gray.500"}
                    cursor="pointer"
                    _hover={
                      userBed
                        ? {}
                        : {
                            background: "orange.50",
                            borderWidth: "2px",
                            borderColor: "accent",
                          }
                    }
                    w={"30%"}
                    borderRadius={5}
                    sx={{ aspectRatio: 1 }}
                    textAlign="center"
                    color="primary"
                    bg={userBed ? "gray.100" : "white"}
                    key={i}
                  >
                    <Text fontSize={"sm"}>
                      {userBed ? "NA" : "Click to Select"}
                    </Text>
                  </Box>
                );
              })}
            </Flex>
          </Box>
        ) : null}
      </PopoverBody>
    </PopoverContent>
  );
};

const RoomInfoPopOver = ({ room }) => {
  let history = useHistory()
  return (
    <PopoverContent
      sx={{
        boxShadow: "5px 5px 15.82px 1.18px rgba(191, 195, 207, 0.39)",
      }}
      bg="white"
      color="#28363E"
    >
      <Flex p={3} w="100%" alignItems="center" justify="space-between">
          <Heading size="sm" fontWeight="bold" border="0">
            {room.name}
          </Heading>
        <Tag size="md" variant="subtle">{room.type}</Tag>
      </Flex>
      <PopoverArrow />
      <PopoverBody>
        {room.beds?.length ? (
          <Box>
            <Text fontSize="xs" color="gray.400">
              Beds
            </Text>
            {room.beds.map((b, i) => {
              const userBed = b.userBeds?.length && b.userBeds?.[0];
              console.log('user', userBed)
              return (
                <Tooltip label='See Profile'>
                  <Box
                    p={2}
                    w="100%"
                    border="1px solid #dadada"
                    borderColor={userBed ? "red.200" : "green.200"}
                    borderRadius={5}
                    mb={2}
                    mt={1}
                    key={i}
                    cursor={userBed ? 'pointer' : ''}
                    onClick={() => userBed ? history.push(`/search/user/${userBed.userId}`) : null}
                  >
                    <Flex alignItems="center" justify="space-between">
                        {userBed ? 
                          <Avatar
                            size={"md"}
                            bg={"red.100"}
                            color={"red.500"}
                            src={'https://joeschmoe.io/api/v1/random'}
                          />
                          :
                          <Avatar
                            size={'sm'}
                            bg={"green.100"}
                            color={"green.500"}
                            name={b.name}
                          />
                        }
                        {console.log('dd', b)}
                      <Box ml={2} >
                        {userBed ? (
                          <Box color='gray.500'>
                            <Text fontSize={"sm"} fontWeight='bold'>
                              {userBed.user.name}
                            </Text>
                            <Text fontSize={"xs"} >
                              {userBed.user.student ? userBed.user.student.universityId : userBed.user.staff?.eid}
                            </Text>
                          </Box>
                        ) : 
                          <Heading fontSize="sm" color="green.500">
                            AVAILABLE
                          </Heading>
                        }
                        {/* <Text size="sm">{b.name} </Text> */}
                      </Box>

                    </Flex>
                  </Box>
                </Tooltip>
              );
            })}
          </Box>
        ) : null}
      </PopoverBody>
      <PopoverFooter
        border="0"
        d="flex"
        alignItems="center"
        justifyContent="space-between"
        pb={4}
      >
        {/* <Box color="orange.500" fontSize="sm">
          More info
        </Box>
       */}
      </PopoverFooter>
    </PopoverContent>
  );
};

const AcIcon = (props) => {
  return (
    <Box
      color={"green.400"}
      position="absolute"
      bg="white"
      borderRadius={99}
      top={-2}
      right={-2}
      fontSize={"24px"}
    >
      <Text fontSize="sm">AC</Text>
      {/* <WiSnow /> */}
    </Box>
  );
};

const Bed = ({ flex, bed }) => {
  const userBed = bed.userBeds?.length && bed.userBeds?.[0];

  // const userIsStaff = bed.id > 10 //userBed?.user?.staff
  // const userIsStudent = userBed?.user?.student
  // const isFemale =  bed.id < 6 //userBed?.user?.gender === 'female'

  // const bg = userBed ? userIsStaff ? "hostel.staff.bg" : isFemale ? "hostel.girls.bg" : "hostel.boys.bg" : "white"

  const bg = userBed ? "#FFC9D0" : "white";
  return (
    <Flex
      flex={flex}
      _notLast={{
        borderRight: "0.5px solid #DBDDEF",
      }}
      bg={bg}
    ></Flex>
  );
};
