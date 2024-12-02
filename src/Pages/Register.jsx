import React, { useState } from 'react';
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
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { FaUserAlt, FaLock, FaPhone } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import  api from '../axios'
 import {useNavigate} from 'react-router-dom'
import { useIMS } from '../Context/IMSContext';
const Register = () => {

  const navigate = useNavigate()
  // State variables for inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast()

  const {isAuthenticated} = useIMS()
  useEffect(()=>{
    if(isAuthenticated){
      navigate('/')
      }
  },[])

  // Function to handle registration
  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);

    api.post('/users/register',{
      name: name,
      email: email,
      password: password
    }).then((res)=>{
      console.log(res.data);
      localStorage.setItem('token',res.data?.token)
      toast({
        title: 'Registration Successful',
        description: 'You have been registered successfully',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
      navigate('/verify')
    }).catch((err)=>{
      toast({
        title: 'Error',
        description: err.message ||'Registration failed',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
      console.log('Error',err.message);
    })
    setIsLoading(false);
  };

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
          Register
        </Text>

        <VStack spacing={4}>
          {/* Name Input */}
          <FormControl>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.500">
                <FaUserAlt />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Enter your name"
                focusBorderColor="teal.400"
                variant="filled"
                bg="gray.800"
                color="white"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>
          </FormControl>

          {/* Email Input */}
          <FormControl>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.500">
                <MdEmail />
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

          {/* Submit Button */}
          <Button
            colorScheme="teal"
            w="full"
            mt={4}
            className="text-lg font-bold"
            onClick={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? <Spinner size="sm" /> : 'Register'}
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default Register;
