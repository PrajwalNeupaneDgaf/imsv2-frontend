import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, Menu, MenuButton, MenuItem, MenuList, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { MdNotificationsActive, MdOutlineInventory, MdOutlineNotificationsNone, MdReport } from "react-icons/md";
import { GrDashboard, GrUserManager } from "react-icons/gr";
import { LiaOpencart } from "react-icons/lia";
import { FaMoneyBillWave, FaUserCog } from 'react-icons/fa';


const Navbar = () => {
    const [HasNotification, setHasNotification] = useState(false)




    const nav = [{
        id: 1,
        name: 'Dashboard',
        icon: <GrDashboard/>,
        link: '/',
    },
    {
        id: 2,
        name: 'Inventory',
        icon: <MdOutlineInventory/>,
        link: '/inventory',
    },
    {
      id: 12,
      name: 'Supplier',
      icon: <FaUserCog/>,
      link: '/supplier',
    },
    {
      id: 13,
      name: 'Purchase',
      icon: <FaMoneyBillWave/>,
      link: '/purchase',
    },
    {
        id:3,
        name: 'Sale',
        icon: <LiaOpencart/>,
        link: '/sale',
    },
    {
        id: 4,
        name: 'Report',
        icon: <MdReport/>,
        link: '/report',
    },
    {
        id: 5,
        name: 'Users',
        icon: <GrUserManager/>,
        link: '/users',
    }
]

const { isOpen, onOpen, onClose } = useDisclosure()
const btn = useRef()

  return (
   <Box maxW={'100%'} px={[0,0,'1rem','2rem']} className='bg-gray-950 fixed top-0
   left-0 right-0 py-3 text-gray-200 flex flex-row justify-between z-50'>

        <Box className='cursor-default font-bold text-transparent bg-clip-text text-xl bg-gradient-to-l items-center from-red-700 to-blue-800 flex flex-row gap-2'>
       
        <Box ref={btn} onClick={onOpen}>
        <GiHamburgerMenu  color='white' className='cursor-pointer' />
        </Box>
            ADMIN
        </Box>

        <Box className='flex flex-row gap-3 items-center'>

        {
            !HasNotification ? <MdOutlineNotificationsNone size={'1.8rem'} color='white' className='cursor-pointer'/> : <MdNotificationsActive className='cursor-pointer' size={'1.8rem'} color='pink'/>
        }

       

       <Menu isLazy>
      
        <MenuButton>
        <Box className='bg-gray-200 cursor-pointer p-1 rounded-full'>
        <GrUserManager size={'1.6rem'} color='black' />
        </Box>
        </MenuButton>
        <MenuList bg={'gray.700'}>
            <MenuItem bg={'gray.700'} _hover={{
                bg: 'gray.600',
            }}
            onClick={()=>{
                location.href = '/profile'
            }}
            >Profile</MenuItem>
            <MenuItem bg={'gray.700'}
            _hover={{
                bg: 'gray.600',
            }}
            onClick={()=>{
                localStorage.removeItem('token')
                location.href = '/login'
            }}
            >Logout</MenuItem>
        </MenuList>
       
       </Menu>

        </Box>

        <Drawer
        colorScheme='dark'
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btn}
      >
        <DrawerOverlay />
        <DrawerContent bg={'gray.800'} color={'wheat'}>
          <Box className="flex flex-row justify-between items-center p-4">
            <Box className="font-serif text-xl font-bold">Menu</Box>
            <DrawerCloseButton />
          </Box>

          <DrawerBody mt="2rem">
            {nav.map((itm) => (
              <Box
                key={itm.id}
                className="flex items-center p-2 my-2 hover:bg-teal-500 rounded-md"
                bg={location.pathname==itm.link?'teal.400':''}
                cursor={location.pathname==itm.link?'default':'pointer'}
                onClick={() => {
                 if(location.pathname!==itm.link){
                  location.href= itm.link
                 }
                  onClose();
                }}
              >
                <span className="mr-2">{itm.icon}</span>
                {itm.name}
              </Box>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>

        </Box>


  )
}

export default Navbar