import {
  Box,
  Flex,
  Heading,
  Image,
  Skeleton,
  Text,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Button,
  Stack,
  Spinner,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Textarea,
  useToast
} from "@chakra-ui/core";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useGetUserQuery, GET_HOSTELS, useUpdateBedQuery } from "../../lib/graphql/user/Queries";
import { UserTag } from "../../Components/UserTag";
import { CustomTab, tabListStyles } from "../../Components/CustomTab";
import HostelSelector from "../Hostel/HostelSelector";
import CustomDatePicker from "../../Components/CustomDatePicker";
import { useAllotRoomMutation } from "../../lib/graphql/hostel/Queries";
import LoadingView from "../../Components/LoadingView";
import { toServerDate } from "../../utils/datehelper";
import EndHostelModal from "../../Components/EndHostelModal";
import ProfilePhotoDrawer from "../../Components/ProfilePhotoDrawer";
import UserHostelHistory from "../../Components/UserHostelHistory";
import _ from 'lodash'
import dayjs from "dayjs";
import {getUserAvatarMock} from '../../utils/avatarurl'

let Context = React.createContext();

const UserProfile = () => {
  let params = useParams();
  const [user, setUser] = useState();
  const [editPhoto, setEditPhoto] = useState(false);

  const [getUser, { data, loading , refetch}] = useGetUserQuery({fetchPolicy:'network-only'});

  const _getUser = useCallback(
    (values) => {
      getUser({ variables: values });
    },
    [getUser]
  );

  useEffect(() => {
    _getUser({ id: params.id });
  }, [_getUser, params.id]);

  useEffect(() => {
    if (data) {
      setUser(data.user);
    }
  }, [data]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: selectorOpen,
    onOpen: onOpenSelector,
    onClose: onCloseSelector,
  } = useDisclosure();

  const [selectedHostel, setSelectedHostel] = useState();

  const _onHostel = (bed, room, hostel) => {
    setSelectedHostel({ hostel, room, bed });
  };

  return (
    <Context.Provider
      value={{ loading, user, selectedHostel, onOpen, onOpenSelector, setEditPhoto }}
    >
      <Box w="100%" h={"100vh"} px={[2, 4, 6]}>
        <ProfileHead />
        <ControlledExample user={data?.user} />
        <Flex></Flex>
      </Box>
      <HostelUpdateDrawer setSelectedHostel={setSelectedHostel}getUser={_getUser} refetchUser={refetch} user={data?.user} isOpen={isOpen} onClose={onClose} />
      <ProfilePhotoDrawer isOpen={editPhoto} onClose={() => setEditPhoto(false)}/>
      <HostelSelector
        isOpen={selectorOpen}
        onSelect={_onHostel}
        onClose={onCloseSelector}
      />
    </Context.Provider>
  );
};

const ProfileHead = () => {
  const { user} = useContext(Context);

  const UserInfo = (props) => {
    return (
      <Flex mt={2} justifyContent="center" w="100%">
        <UserTag user={{ gender: user.gender, student: user.student, staff: user.staff }} />
      </Flex>
    );
  };
  return user ? (
    <Flex w="100%" flexDirection={["column", "column", "row"]} mt={6} mb={2}>
      <Flex
        flex={1}
        m={1}
        border="1px solid #F2F4F4"
        borderLeftRadius="8px"
        textAlign="center"
        bg="white"
        pb={6}
        flexDirection="column"
      >
        <Box p={5} w="100%">
          <Image
            borderRadius="full"
            style={{ display: "inline" }}
            border="1px solid grey"
            boxSize={100}
            id="sandbox-img"
            src={getUserAvatarMock(user.gender)}
          />
        </Box>
        {user ? (
          <Box>
            <Heading size="lg">{user.name}</Heading>
            <Text color="gray.500" fontSize="md">
              ID: <span color="gray.500">{user.staff?.eid || user.student?.universityId}</span>
            </Text>
          </Box>
        ) : null}
        <UserInfo />
      </Flex>

      <Flex
        flex={2}
        m={1}
        p={8}
        flexDirection={["column", "column", "row"]}
        border="1px solid #F2F4F4"
        borderRightRadius="8px"
        bg="white"
      >
        <Flex
          flex={1}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <HostelDetails />
        </Flex>
        <Flex
          flex={1}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <OtherDetails />
        </Flex>
      </Flex>
    </Flex>
  ) : (
    <Box p={4}>
      <Spinner />
    </Box>
  );
};
const OtherDetails = (props) => {
  let history = useHistory()
  const { user, setEditPhoto } = useContext(Context);
  return (
    <Flex direction="column" alignItems="center" p={2}>
      <Stack>
        <Button variant="outline" onClick={() => history.push('/user/edit/'+user.id)} color="gray">
          EDIT PROFILE
        </Button>
        <Button variant="outline" onClick={setEditPhoto} color="gray">
          EDIT PHOTO
        </Button>
      </Stack>
    </Flex>
  );
};

const HostelDetails = (props) => {
  const { user, onOpen } = useContext(Context);
  const userBed = user.userBeds ? _.find(user.userBeds, bed => bed.isActive) : null;
  const lastBed = user.userBeds ? _.maxBy(user.userBeds, bed => bed.id) : null;

  const hostelChange = () => {
    onOpen();
  };

  return user.userBeds?.length ? 
          userBed ? 
            <HostelInfo hostelChange={hostelChange} userBed={userBed} />
            :
            <LastHostelInfo hostelChange={hostelChange} lastBed={lastBed} />
          :
          (
            <Flex direction="column" alignItems="center" p={2}>
              <Heading textAlign="center" size={"sm"}>
                No Hostel alloted
              </Heading>

              <Button mt={2} colorScheme="orange" onClick={hostelChange}>
                Allot hostel now
              </Button>
            </Flex>
          )
};

const LastHostelInfo = ({lastBed, hostelChange}) => {

  return(
    <>
      <Flex alignItems="center" p={2}>
          <Box px={5} textAlign='cenetr'>
            <Text color="gray.500" fontSize="sm">
              Last Hostel End Date
            </Text>
            <Text fontWeight="bold" textAlign='center' fontSize="xl">
              {dayjs(lastBed.endDate).format('MM/DD/YYYY')}
            </Text>
          </Box>
          {lastBed.remark ? 
            <Box px={5} borderLeft="2px solid #E5E7E9">
              <Text color="gray.500" fontSize="sm">
                Remark
              </Text>
              <Text fontSize="lg">
                {lastBed.remark}
              </Text>
            </Box>
            : null
          }
      </Flex>
      <Button mt={2} colorScheme="orange" onClick={hostelChange}>
        Allot hostel now
      </Button>
    </>
  )
}

const HostelInfo = ({ userBed, hostelChange }) => {
  const bed = userBed?.bed;
  const room = bed?.room;
  const floor = room?.floor;
  const hostel = floor?.hostel;

  const _changeHostel = () => {
    hostelChange();
  };

  return (
    <Flex direction="column" alignItems="center" p={2}>
      <Heading textAlign="center" fontSize='25px'>
        {hostel.name}
      </Heading>
      <Flex w="100%" my={3} justifyContent="center">
        <Box px={10} borderRight="2px solid #E5E7E9">
          <Text fontWeight="bold" fontSize="lg">
            {room.name}
          </Text>
          <Text color="gray.500" fontSize="sm">
            Room
          </Text>
        </Box>
        <Box px={10}>
          <Text fontWeight="bold" fontSize="lg">
            {floor.name}
          </Text>
          <Text color="gray.500" fontSize="sm">
            Floor
          </Text>
        </Box>
      </Flex>
      <Button mt={2} colorScheme="green" onClick={_changeHostel}>
        Change Hostel
      </Button>
    </Flex>
  );
};

export default UserProfile;

function ControlledExample({user}) {
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  return (
    <Box my={[6]}>
      <Tabs index={tabIndex} onChange={handleTabsChange}>
        <TabList my={1} sx={tabListStyles}>
          <CustomTab>User Details</CustomTab>
          <CustomTab>Hostel Details</CustomTab>
          <CustomTab>Fees Details</CustomTab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {user ? <UserDetails user={user}/> : null}
          </TabPanel>
          <TabPanel>
            {user ? <UserHostelHistory beds={user.userBeds}/> : null}
          </TabPanel>
          <TabPanel>
            <p>On hold</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

const UserDetails = ({user}) => {
  let userType = user.staff ? 'staff' : 'student' 
  let {dob, email, gender, aadhar, contact, contact1, address, city, state, country, pin, religion, category, nationality, fatherName, fatherContact, motherName, motherContact,
      staff, student } = user

  return(
    <Flex flexDirection="column" p={8} border="8px" bg="white">
      <Flex flexWrap="wrap">
        <Info title="Date of Birth" value={dob} />
        <Info title="Gender" value={gender} />
        <Info title="Email" value={email} />
        {/* <Info title="Aadhar" value={aadhar} /> */}
      </Flex>
      <br />
      <Flex flexWrap="wrap">
        <Info title="University Id" value={userType === 'student' ? user.student.universityId : user.staff.eid}/>
        <Info title="Contact 1" value={contact} />
        <Info title="Contact 2" value={contact1} />
      </Flex>
      <br />
      <Flex flexWrap="wrap">
        <Info title="Address" value={address} length="4" />
        <Info title="City" value={city} />
        <Info title="State" value={state} />
        <Info title="Country" value={country} />
        <Info title="Pin" value={pin} />
      </Flex>
      <br />
      <Flex flexWrap="wrap">
        <Info title="Religion" value={religion} />
        <Info title="Category" value={category} />
        <Info title="Nationality" value={nationality} />
      </Flex>
      <br />
      <Flex flexWrap="wrap">
        <Info title="Father Name" value={fatherName} />
        <Info title="Father Contact" value={fatherContact} />
        <Info title="Mother Name" value={motherName} />
        <Info title="Mother Contact" value={motherContact} />
      </Flex>
      <br />
      {userType === 'staff' ? 
        <Flex flexWrap="wrap">
          <Info title="Designation" value={staff.desi} />
          <Info title="Department" value={"9999999999"} />
          {/* <Info title="Institute Id" value={"9999999999"} /> */}
        </Flex>
        :
        <Flex flexWrap="wrap">
          <Info title="Course" value={student.batch?.course?.name} />
          <Info title="Batch" value={student.batch?.name} />
          <Info title="Section" value={student.section} />
          {/* <Info title="University Id" value={"9999999999"} /> */}
        </Flex>
      }
    </Flex>
  )
}

const Info = ({ title, value, length, margin }) => {
  const { loading } = useContext(Context);
  return (
    <Flex mx={3} my={1} width={["100%", "50%", "20%"]}>
      <Box>
        <Text color="#AEB6BF" fontWeight="bold" fontSize="sm">
          {title}
        </Text>
        <Skeleton isLoaded={!loading}>
          <Text fontSize="md">{value || "-"}</Text>
        </Skeleton>
      </Box>
    </Flex>
  );
};


function HostelUpdateDrawer({ refetchUser, isOpen, onClose, user, getUser, setSelectedHostel }) {
  const { onOpenSelector, selectedHostel } = useContext(Context);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState("");
  const [leftHostel, setLeftHostel] = useState(false);

  const params = useParams()
  const toast = useToast()
  
  const [updateUserBed, { data:updatedBedData, loading:leftHostelLoading}] = useUpdateBedQuery({
    refetchQueries: ()=>[{query: GET_HOSTELS}],
    onCompleted:data => {
      setLeftHostel(false)
      toast({
        status:'success',
        title:"Hostel Left!",
        description:'User removed from the hostel..'      
      })
    }
  });

  useEffect(() => {
    if(!leftHostel && updatedBedData && !updatedBedData.updateUserBed.isActive){
      getUser({ id: params.id })
    }
  }, [leftHostel, updatedBedData])

  const [updateRoom , {loading}] = useAllotRoomMutation({
    onError: error => {
    alert("Error updating hostel " + error.message)  
  },
  
  refetchQueries: ()=>[{query: GET_HOSTELS}],
  onCompleted: data => {
    if(data){
      toast({
      status:'success',
      title:"Hostel Updated!",
      description:'Hostel updated successfully..'      
    })
    onClose()
    refetchUser()
    setSelectedHostel('')
    
//    refetchHostels()
    }  
}})


  const _updateRoom = props => {
    if(selectedHostel && startDate && endDate){
      updateRoom({variables: {
      data:{
        userId:parseInt(user.id,10),
        bedId: parseInt(selectedHostel.bed.id, 10),
        startDate : toServerDate(startDate),
        endDate:toServerDate(endDate),
      }
    }})
    }else{
      toast({
        isClosable:true,
        position:"bottom-left",
        status:'error',
        title:'Incomplete data',
        description:"room, startDate & endDate are mandatory!"
      })
    }
  }

  const userBed = user?.userBeds.length
    ? _.find(user.userBeds,bed=> bed.isActive)
    : null;
  const bed = userBed?.bed;
  const room = bed?.room;
  const floor = room?.floor;
  const hostel = floor?.hostel;
  return  (
    <>
    <Drawer size={"xl"} isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Update Hostel</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
                <Box mx={2} w="100%">
                  {userBed ? (
                      <>
                      <SelectedHostel leftHostel={() => setLeftHostel(true)}
                      hostel={hostel} room={room}
                    />
                      <br/>
                      <hr/>
                      <br/>
                      </>
                  ) : null}
                  {leftHostel ?  <EndHostelModal updateUserBed={updateUserBed} loading={leftHostelLoading} user={user} isOpen={leftHostel} onClose={() => setLeftHostel(false)}/> : null}

                  {!selectedHostel && !leftHostel ? (
                    <Box>
                      <Text color="text.secondary">
                        Please select a room / bed
                      </Text>
                        <Flex>
                        <Flex
                        justifyContent="center"
                        borderRadius={8}
                        onClick={onOpenSelector}
                        mt={1}
                        _hover={{ backgroundColor: "gray.200" }}
                        border="1px solid #dadada"
                        p={3}
                      >
                        <Text>Select Room</Text>
                      </Flex>
                        </Flex>
                    </Box>
                  ) : selectedHostel ?  (
                      <SelectedHostel                       
                      onOpenSelector={onOpenSelector}
                        selected
                         hostel={selectedHostel.hostel}
                        room={selectedHostel.room}
                      />
                  ) : null}

                </Box>

              <Flex w="100%">
                <Box flex={1} mx={2}>
                  <Text mb={1} fontSize="sm">
                    Start Date
                  </Text>
                  <CustomDatePicker value={startDate} onChange={(date) => setStartDate(date)} />
                </Box>

                <Box flex={1} mx={2}>
                  <Text mb={1} fontSize="sm">
                    End Date
                  </Text>
                  <CustomDatePicker value={endDate} onChange={(date) => setEndDate(date)} />
                </Box>
              </Flex>

              {/* <Flex w="100%">
                <Box mx={2} flex={1}>
                  <Text size="sm">Remarks</Text>
                  <Textarea type="text" />
                </Box>
              </Flex> */}
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button disabled={!selectedHostel} onClick={_updateRoom} colorScheme="blue">
              Submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
      {
        loading ? <LoadingView absolute /> :null

      }
    </>
  );
}

const SelectedHostel = ({ hostel, room, selected, onOpenSelector, leftHostel }) => {
  return (
    <Box>
      <Text color="text.secondary">
        {selected ? "Selected" : "Current"} Room
      </Text>
      <Flex w="100%">
        <Box pr={10} borderRight="2px solid #E5E7E9">
          <Text fontWeight="bold" fontSize="lg">
            {hostel.name}
          </Text>
          <Text color="gray.500" fontSize="sm">
            Hostel
          </Text>
        </Box>
        <Box px={10}>
          <Text fontWeight="bold" fontSize="lg">
            {room.name}
          </Text>
          <Text color="gray.500" fontSize="sm">
            Room
          </Text>
        </Box>
        {selected && onOpenSelector ? 
            <Box px={10} borderLeft="2px solid #E5E7E9">
              <Button onClick={onOpenSelector} colorScheme="blue" size="sm">
                Reselect room
              </Button>
            </Box>
          : 
          <Box px={10} marginLeft='auto'>
            <Button variant="link" onClick={leftHostel} colorScheme="red" size="md">
              End Hostel
            </Button>
          </Box>
        }
      </Flex>
    </Box>
  );
};
