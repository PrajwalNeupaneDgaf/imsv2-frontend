import React, { useEffect, useState } from 'react';
import {
  Box,
  Center,
  Text,
  Button,
  Spinner,
  VStack,
  Link,
  useToast,
} from '@chakra-ui/react';
import { useIMS } from '../Context/IMSContext';
import { useParams } from 'react-router-dom';
import api from '../axios';




const Verifying = () => {

  const Toast = useToast()
  
  const [isVerifying, setIsVerifying] = useState(true);
  const {token } = useParams();
const {user } = useIMS()
  useEffect(()=>{
    if(user.isVerified){
        location.href = '/'
        return
    }
    api.get(`/users/verify/${token}`)
    .then(res => {
        setIsVerifying(false)
        location.href = '/'
    })
    .catch(err => {
        console.log(err)
        Toast({
            title: 'Error',
            description: 'Failed to verify account',
            status: 'error',
            duration: 9000,
            isClosable: true,
        })
        })
  },[])
  return (
    <Center className="h-[100vh]" bg="gray.800" color="white">
      <Box
        bg="gray.700"
        p="8"
        borderRadius="md"
        boxShadow="lg"
        className="w-[90%] sm:w-[400px]"
      >
        <VStack spacing={4} align="center">
          <Text className="text-center font-sans text-2xl font-bold mb-4">
            Verifying Your Email...
          </Text>
          {isVerifying ? (
            <>
              <Spinner size="xl" color="teal" />
              <Text textAlign="center" fontSize="lg" color="gray.300" mt={4}>
                We are verifying your email. Please wait while we complete the process.
              </Text>
            </>
          ) : (
            <>
              <Text textAlign="center" fontSize="lg" color="teal.400" mt={4}>
                Your email has been successfully verified!
              </Text>
            </>
          )}
        </VStack>
      </Box>
    </Center>
  );
};

export default Verifying;
