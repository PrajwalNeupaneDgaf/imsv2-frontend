import { Box, Button, Center, Spinner } from '@chakra-ui/react'
import React from 'react'

const LoadingScreen = () => {
  return (
    <Box as={Center} h={'100vh'} bg={'gray.900'}>
        <Spinner size={'lg'}/>
        <Button colorScheme='black' onClick={()=>{
          location.href = '/login'
        }}>
        Go To Login 
        </Button>
    </Box>
  )
}

export default LoadingScreen