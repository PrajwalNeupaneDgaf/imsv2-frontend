import React, { useEffect, useState } from 'react';
import {
  Box,
  Center,
  Text,
  Button,
  VStack,
  Spinner,
  Link,
  useToast,
} from '@chakra-ui/react';
import { MdEmail } from 'react-icons/md';
import { useIMS } from '../Context/IMSContext';
import api from '../axios';
import LoadingScreen from '../Components/LoadingScreen';

const Verify = () => {
  const [isloading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  const {user ,isLoading} = useIMS()

  const Toast = useToast()

  if(isLoading){
    return <LoadingScreen/>

  }


  const handleVerifyEmail = () => {
    setIsLoading(true);
    if(user.isVerified){
       location.href = '/'
        setIsVerified(true)
        Toast({
            title: 'Email Verified',
            status: 'success',
            duration: 2000,
            isClosable: true,
                        
        })
       
    }
    api.post('/users/sendemail')
    .then((res) => {
        setIsLoading(false);
        setIsVerified(true);
    })
    .catch((err) => {
        setIsLoading(false);
        console.error(err);
        Toast({
            title: 'Error',
            status: 'error',
            description: err.response.data.message || 'already Verified',
            duration: 2000,
            isClosable: true,
        })
        });
   
  };

  useEffect(()=>{
    handleVerifyEmail()
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
          <MdEmail size="50px" color="teal" />
          <Text className="text-center font-sans text-2xl font-bold mb-4">
            Verify Your Email
          </Text>
          {!isVerified ? (
            <>
              <Text textAlign="center" fontSize="lg" color="gray.300">
                Please check your inbox for a verification email. If you didn't receive it,
                click the button below to resend the verification email.
              </Text>

              <Button
                colorScheme="teal"
                w="full"
                mt={4}
                className="text-lg font-bold"
                onClick={handleVerifyEmail}
                disabled={isLoading}
              >
                {isloading ? <Spinner size="sm" /> : 'Resend Verification Email'}
              </Button>
            </>
          ) : (
            <Text textAlign="center" fontSize="lg" color="teal.400">
              Your email has been successfully verified! You can now log in.
            </Text>
          )}

          <Link href="/login" color="teal.400" mt={4}>
            Back to Login
          </Link>
        </VStack>
      </Box>
    </Center>
  );
};

export default Verify;
