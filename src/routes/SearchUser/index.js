import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  Stack,
  Text,
  Avatar,
  useTheme,
} from "@chakra-ui/core";
import React, { useEffect, useState, useRef, useContext, useMemo } from "react";
import _ from "lodash";
import { BiChevronDown } from "react-icons/bi";
import { SearchIcon } from "@chakra-ui/icons";
import { hostelsAtom } from "../../atoms/hostels.atom";
import { searchUserDataAtom } from "../../atoms/user.atoms";
import { useRecoilState } from "recoil";
import { Content } from "../../Components/Content";
import { useSearchUserQuery } from "../../lib/graphql/user/Queries";
import { useHistory } from "react-router-dom";
import { MenuWrapper } from "../../Components/MenuWrapper";
import { UserTag } from "../../Components/UserTag";
import {getUserAvatarMock} from '../../utils/avatarurl'

const ListColumn = ({ title, value }) => {
  return (
    <Box>
      <Text color="gray.500" fontSize="sm">
        {title}
      </Text>
      <Text fontSize="md">{value}</Text>
    </Box>
  );
};

const SearchUser = (props) => {
  const [searchUser, { data, loading, error }] = useSearchUserQuery();

  const searchConfig = useRef();

  const _searchUser = (values) => {
    searchConfig.current = values;
    searchUser({ variables: { data: values } });
  };

  const [{ data: usersData }, setSearchUserConfig] = useRecoilState(
    searchUserDataAtom
  );

  useEffect(() => {
    if (data) {
      setSearchUserConfig({ ...searchConfig.current, data });
    }
  }, [data, setSearchUserConfig]);

  const users = usersData?.searchUser;
  return (
    <Content heading="Search User" overflowY="auto">
      <Box>
        <SearchSection searchUser={_searchUser} />
        <br />
        <br />
        {loading ? (
          <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        ) : error ? (
          <Box p={5}>
            <Text color="red.400">Error searching users...</Text>
          </Box>
        ) : (
          <StudentsList users={users} />
        )}
      </Box>
    </Content>
  );
};

const StudentListContext = React.createContext()

export const StudentsList = ({ users, hideHostel }) => {
  return users && users.length ? (
    <StudentListContext.Provider value={{hideHostel}}>
      <Box>
        {_.orderBy(users, ['name'], ['asc']).map((user) => {
          return <StudentItem key={user.id} user={user} />;
        })}
      </Box>
    </StudentListContext.Provider>
  ) : (
    null
  );
};

const StudentItem = ({ user }) => {
  let history = useHistory();

  const _open = () => history.push("/search/user/" + user.id);

  const batch = user.student?.batch;
  const course = batch?.course?.name;

  const department = user.staff?.department?.name;
  const designation = user.staff?.designation;

  const CourseName = () => (
    <Box>
      {course || department ? <Text>{course || department}</Text> : "-"}
      {batch || designation ? (
        <Text size="xs" color="text.secondary">
          {batch?.name || designation}
        </Text>
      ) : null}
    </Box>
  );

  const userBed = user.userBeds?.length && user.userBeds[0];
  const bed = userBed?.bed;
  const room = bed?.room;
  const hostel = room?.floor?.hostel?.name;
  const {hideHostel} = useContext(StudentListContext)

  const HostelRoom = () => {
    return (
      <Box>
        {hideHostel ? '' : hostel ? <Text>{hostel}</Text> : "-"}
        {room ? (
          <Text fontSize="sm">{room.name + " - " + bed?.name}</Text>
        ) : null}
      </Box>
    );
  };
  return (
    <Box
      px={5}
      onClick={_open}
      cursor="pointer"
      _hover={{ background: "#EaEaEb", borderRadius: 5, border: "0px" }}
    >
      <Flex alignItems="center" py={3} justifyContent="space-evenly">
        <Flex flex={2}>
          <Avatar
            src={getUserAvatarMock(user.gender)}
            size="md"
            name={user.name}
          />
          <Box ml={5}>
            <Heading size="sm">{user.name}</Heading>
            <Text fontSize="xs">
              {user.student ? user.student.universityId : user?.staff?.eid}
            </Text>
          </Box>
          {/* <Box><Text color="gray.500" fontSize='sm'></Text><Text color={user.student ? '#03A9F4' : '#9CCC65'} fontSize='lg'>{user.student ? 'Student' : 'Staff'}</Text></Box> */}
        </Flex>
        {/* <Flex flex={1/5}>
                    <ListColumn title='Roll Number' value={user.student ? user.student.universityId : user?.staff?.eid}/>
                </Flex>
                <Flex flex={1/5}>
                    <ListColumn title='Name' value={user.name}/>
                </Flex> */}
        <Flex flex={1}>
          <CourseName />
        </Flex>
        <Flex flex={1}>
          <HostelRoom />
        </Flex>

        <Flex flex={1}>
          <UserTag user={user} />
        </Flex>
      </Flex>
      <hr style={{ padding: 0, margin: 0 }} />
    </Box>
  );
};

const SearchSection = (props) => {
  const [searchFor, setSearchFor] = useState("All");
  const [hostel, selectHostel] = useState();
  const [searchBy, setSearchBy] = useState("Name");
  const [searchQuery, setSearchQuery] = useState("");
  const [hostels] = useRecoilState(hostelsAtom);

  const setHostel = (h) => {
    const hos = _.find(hostels.hostels, (ho) => {
      return ho.id === h + "";
    });
    selectHostel(hos);
  };

  const submitForm = (e) => {
    e.preventDefault();
    props.searchUser({
      type: _.camelCase(searchFor),
      searchKey: _.camelCase(searchBy),
      searchQuery: _.camelCase(searchQuery),
      hostelId: hostel ? parseInt(hostel.id, 10) : undefined,
    });
  };

  const [
    {
      data,
      type: lastType,
      searchKey: lastKey,
      searchQuery: lastQuery,
      hostelId: lastHostelId,
    },
  ] = useRecoilState(searchUserDataAtom);

  const lastHostelName = useMemo(() => {
    let hostel = _.find(hostels.hostels, (h) => h.id === lastHostelId + "");
    return hostel?.name;
  }, [lastHostelId, hostels]);

  const sizeUsers = _.size(data?.searchUser);

  const theme = useTheme();

  const _refresh = () => {
    props.searchUser({
      type: lastType,
      searchKey: lastKey,
      searchQuery: lastQuery,
      hostelId: lastHostelId,
    });
  };

  return (
    <>
      <Stack isInline pt="20px" spacing={10}>
        <span>
          Search For :&nbsp;
          <MenuWrapper
            trigger={
              <MenuButton as={Button}>
                <Flex>
                  {searchFor == "All" ? "Staff and Student" : searchFor}
                  &nbsp;
                  <BiChevronDown pl="5px" />
                </Flex>
              </MenuButton>
            }
          >
            <MenuList
              defaultChecked="All"
              onClick={(e) => setSearchFor(e.target.value)}
            >
              <MenuItem value="All">Staff and Student</MenuItem>
              <MenuItem value="Student">Student</MenuItem>
              <MenuItem value="Staff">Staff</MenuItem>
            </MenuList>
          </MenuWrapper>
        </span>
        <span>
          Hostel :&nbsp;
          <MenuWrapper
            trigger={
              <MenuButton as={Button}>
                <Flex>
                  {hostel?.name || "All"}&nbsp;
                  <BiChevronDown pl="5px" />
                </Flex>
              </MenuButton>
            }
          >
            <MenuList
              defaultChecked="all"
              onClick={(e) => setHostel(e.target.value)}
              overflowY="auto"
              maxH="50vh"
            >
              <MenuItem value="All">All</MenuItem>
              {hostels.hostels
                ? hostels.hostels.map((hostel) => (
                    <MenuItem value={hostel.id} key={hostel.id}>
                      {hostel.name}
                    </MenuItem>
                  ))
                : null}
            </MenuList>
          </MenuWrapper>
        </span>
        <span>
          Search By :&nbsp;
          <MenuWrapper
            trigger={
              <MenuButton as={Button}>
                <Flex>
                  {searchBy}&nbsp;
                  <BiChevronDown pl="5px" />
                </Flex>
              </MenuButton>
            }
          >
            <MenuList
              defaultChecked="Name"
              onClick={(e) => setSearchBy(e.target.value)}
            >
              <MenuItem value="Name">Name</MenuItem>
              <MenuItem value="Roll Number">Roll Number</MenuItem>
              <MenuItem value="Father Name">Father Name</MenuItem>
            </MenuList>
          </MenuWrapper>
        </span>
      </Stack>
      <br />
      <form onSubmit={(e) => submitForm(e)}>
        <Flex alignItems="center">
          <InputGroup alignItems="center">
            <InputLeftElement
              style={{ top: "initial" }}
              children={
                <SearchIcon
                  color="gray.300"
                  display="flex"
                  alignItems="center"
                />
              }
            />
            <Input
              name="searchQuery"
              autoFocus
              autoComplete="off"
              spellCheck="false"
              onChange={(e) => setSearchQuery(e.target.value)}
              fontSize={"xl"}
              fontWeight="500"
              placeholder="Search"
              sx={{ border: "1px solid #EaEaEb", height: 70 }}
            />
          </InputGroup>
          <Button ml={3} colorScheme="blue" type="submit" size="lg">
            Search
          </Button>
        </Flex>
      </form>
      <br />
      <Text fontSize="lg">
        {lastKey ? (
          <span>
            Found
            <span style={{ fontStyle: "italic", color: theme.colors.accent }}>
              &nbsp;{sizeUsers}&nbsp;
            </span>{" "}
            users
            {lastHostelName ? (
              <span>
                {" "}
                in{" "}
                <span
                  style={{ fontStyle: "italic", color: theme.colors.accent }}
                >
                  {lastHostelName}
                </span>{" "}
              </span>
            ) : (
              " "
            )}
            {lastQuery ? (
              <span>
                where
                <span
                  style={{ fontStyle: "italic", color: theme.colors.accent }}
                >
                  &nbsp;{lastKey}&nbsp;
                </span>{" "}
                contains
                <span
                  style={{ fontStyle: "italic", color: theme.colors.accent }}
                >
                  &nbsp;"{lastQuery}"&nbsp;
                </span>
              </span>
            ) : null}
            <Button ml={5} variant="link" colorScheme="blue" onClick={_refresh}>
              Refresh
            </Button>
          </span>
        ) : null}
      </Text>
    </>
  );
};

export default SearchUser;
