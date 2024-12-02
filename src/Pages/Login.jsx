import React, { useEffect, useState } from 'react';
import {
  Box,
  Center,
  Text,
  Input,
  Button,
  VStack,
  InputGroup,
  InputLeftElement,
  FormControl,
  HStack,
  Link,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { FaUserAlt, FaLock, FaUserPlus } from 'react-icons/fa';
import api from "../axios"
import { useNavigate } from "react-router-dom";
import { useIMS } from '../Context/IMSContext';
import LoadingScreen from '../Components/LoadingScreen';

const Login = () => {
  // State variables for input fields and loading
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isloading, setLoading] = useState(true);


  const toast = useToast()
  const navigate = useNavigate()

  const {isAuthenticated } = useIMS()
  useEffect(()=>{
    if(isAuthenticated){
      navigate('/')
      }
      setLoading(false)
  },[isAuthenticated])

  // Login handler
  const handleLogin = () => {
    setIsLoading(true);
    api.post('/users/login',{
      email: email,
      password: password
    })
    .then((res)=>{
      const data = res.data
      localStorage.setItem('token',data?.token)
      toast({
        title: 'Login Success',
        description: 'You have successfully logged in',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
      navigate('/')
    })
    .catch(err=>{
      console.log(err)
      toast({
        title: 'Error',
        description: err.response.data.message||'Invalid email or password',
        status: 'error',
        duration: 2000,
      })


    })
    .finally(()=>{
      setIsLoading(false)
    })
  };

  if(isloading){
    return <LoadingScreen/>

  }
  return (
    <Center className="h-[100vh] bg-gray-800 text-wheat">
      <Box
        bg="gray.700"
        p="8"
        borderRadius="md"
        boxShadow="lg"
        className="w-[90%] sm:w-[400px]"
      >
        <Text className="text-center font-sans text-2xl font-bold mb-6" color="white">
          Login
        </Text>

        <VStack spacing={4}>
          {/* Email Input */}
          <FormControl>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.500">
                <FaUserAlt />
              </InputLeftElement>
              <Input
                type="email"
                placeholder="Enter your email"
                focusBorderColor="teal.400"
                variant="filled"
                bg="gray.800"
                color="white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
          </FormControl>

          {/* Password Input */}
          <FormControl>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.500">
                <FaLock />
              </InputLeftElement>
              <Input
                type="password"
                placeholder="Enter your password"
                focusBorderColor="teal.400"
                variant="filled"
                bg="gray.800"
                color="white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
          </FormControl>

          {/* Login Button */}
          <Button
            colorScheme="teal"
            w="full"
            mt={4}
            className="text-lg font-bold"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? <Spinner size="sm" /> : 'Login'}
          </Button>

          {/* Register Option */}
          <HStack mt={4}>
            <FaUserPlus color="teal" />
            <Link
              href="/register"
              color="teal.400"
              fontWeight="bold"
              fontSize="sm"
              _hover={{ textDecoration: 'underline' }}
            >
              Create a new account
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default Login;
