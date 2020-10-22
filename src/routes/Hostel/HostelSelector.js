
import React, { useState, useMemo } from 'react'
import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Stack, DrawerFooter, Button, MenuButton, Flex, MenuList, MenuItem } from '@chakra-ui/core'
import { MenuWrapper } from '../../Components/MenuWrapper'
import { BiChevronDown } from 'react-icons/bi'
import { useRecoilState } from 'recoil'
import { hostelsAtom } from '../../atoms/hostels.atom'
import { HostelRooms } from './HostelDetails'
import _ from 'lodash'

function HostelSelector({isOpen, onSelect, onClose}) {
  const [hostels] = useRecoilState(hostelsAtom);

    const [hostelId, setHostelId] = useState()

    const _selectBed=(bed, room, hostel)=>{
      // console.log("bed", bed, room, hostel);
      onSelect(bed,room ,hostel)
      onClose()  
    }


    const hostel = useMemo(()=> _.find(hostels.hostels, h=> h.id === hostelId),[hostelId, hostels])

    return (
        <Drawer
          size={"lg"}
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
        >
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader borderBottomWidth="1px">
                Select Hostel
              </DrawerHeader>
  
              <DrawerBody>
                <Stack spacing="24px">
                        <HostelDropDown hostel={hostel} setHostel={setHostelId}/>
                        <HostelRooms hostel={hostel} selectMode onSelect={_selectBed}/> 
                </Stack>
              </DrawerBody>
  
              <DrawerFooter borderTopWidth="1px">
                <Button variant="outline" mr={3} onClick={onClose}>
                  Cancel
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
    )
  }

  export default HostelSelector



  const HostelDropDown = ({hostel, setHostel}) => {
    const [hostels] = useRecoilState(hostelsAtom);
    
    const _setHostel = (p) => {
        setHostel(p.target.value)        
    }
    return (
            <MenuWrapper
            trigger={
              <MenuButton as={Button}>
                <Flex>
                  {hostel?.name || "Select Hostel"}&nbsp;
                  <BiChevronDown pl="5px" />
                </Flex>
              </MenuButton>
            }
          >
            <MenuList
              defaultChecked="all"
              onClick={_setHostel}
              overflowY="auto"
              maxH="50vh"
            >
              {hostels.hostels
                ? hostels.hostels.map((hostel) => (
                    <MenuItem value={hostel.id} key={hostel.id}>
                      {hostel.name}
                    </MenuItem>
                  ))
                : null}
            </MenuList>
          </MenuWrapper>
      )
  }