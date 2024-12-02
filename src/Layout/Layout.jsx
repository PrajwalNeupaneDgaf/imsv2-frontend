import { Box, Button, Center, Spinner } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useIMS } from '../Context/IMSContext'
import Verify from "../Pages/Verify";
import LoadingScreen from '../Components/LoadingScreen';
import Footer from '../Components/Footer';

const Layout = ({children , loading}) => {

  const {user ,isAuthenticated,isAuthorized} = useIMS()
  if(loading){
    return <LoadingScreen/>
  }
  if(!isAuthenticated){
    return <LoadingScreen/>
  }
  if(!isAuthorized){
    return (
      <Box as={Center} maxW="100%" h={'100vh'} m="0 auto" p={4} className={'bg-gray-800 text-white'}>
          You Are Not Authorized Wait or Go To <Button colorScheme='dark'>Next Page</Button>
      </Box>
    )
  }
  return (
   <>
   <Box>
    <Navbar/>
   </Box>
   <Box className='bg-gradient-to-b from-gray-900 max-w-[100vw] to-gray-950 text-white min-h-[100vh]' py={'4rem'} px={[2,3,'1rem','2rem']}>
    {
        children
    }
   </Box>
   <Footer/>
   </>
  )
}

export default Layout