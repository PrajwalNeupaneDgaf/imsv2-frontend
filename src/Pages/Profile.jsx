import React, { useState } from 'react';
import { Box, Flex, Text, Avatar, Button, Input, Divider, Icon, useToast } from '@chakra-ui/react';
import { FaUserCircle } from 'react-icons/fa'; // React Icon for profile
import Layout from '../Layout/Layout';
import { useIMS } from '../Context/IMSContext';
import api from '../axios';
import { AiOutlineCheck, AiOutlineLoading3Quarters } from 'react-icons/ai'; // React Icons for checkmark and loading

const Profile = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false); // Track loading state
  const [isUpdated, setIsUpdated] = useState(false); // Track successful update state
  const [error, setError] = useState(false); // Track error state
  const toast = useToast();

  const { user } = useIMS();

  // Demo API Call Handler
  const handleUpdate = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        status: 'error',
        duration: 1000,
        isClosable: true,
      });
      return;
    }
    if (newPassword) {
      if (!oldPassword) {
        toast({
          title: 'Error',
          description: 'Old password is required',
          status: 'error',
          duration: 1000,
          isClosable: true,
        });
        return;
      }
    }

    setLoading(true); // Start loading
    setIsUpdated(false); // Reset the success state before making the request
    setError(false); // Reset error state before making the request

    api
      .post('/users/update-info', {
        name: name ? name : '',
        oldPassword: oldPassword ? oldPassword : '',
        newPassword: newPassword ? newPassword : '',
      })
      .then((response) => {
        setLoading(false); // Stop loading
        setIsUpdated(true); // Mark as updated
        toast({
          title: 'Success',
          description: 'Profile updated successfully',
          status: 'success',
          duration: 1000,
          isClosable: true,
        });
      })
      .catch((err) => {
        setLoading(false); // Stop loading
        setError(true); // Mark as error
        toast({
          title: 'Error',
          description: err?.response.data?.message || 'Failed to update profile',
          status: 'error',
          duration: 1000,
          isClosable: true,
        });
      });
  };

  return (
    <Layout loading={false}>
      <Box color="white" minH="100vh" p={8}>
        {/* Profile Section */}
        <Flex
          direction="column"
          align="center"
          bg="gray.800"
          p={6}
          borderRadius="md"
          boxShadow="md"
          w={{ base: '100%', sm: '400px' }}
          mx="auto"
        >
          {/* Avatar */}
          <Avatar size="xl" mb={4} bg="teal.500" icon={<Icon as={FaUserCircle} boxSize={10} />} />
          {/* User Details */}
          <Text fontSize="lg" fontWeight="bold">{user.name}</Text>
          <Text fontSize="sm" color="gray.400" mb={4}>{user.email}</Text>
          <Divider borderColor="gray.600" my={4} />

          {/* Update Name */}
          <Box w="100%" mb={4}>
            <Text fontSize="sm" mb={2}>Change Name:</Text>
            <Input
              placeholder="Enter new name"
              bg="gray.700"
              border="none"
              focusBorderColor="teal.400"
              defaultValue={user.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>

          {/* Update Password */}
          <Box w="100%">
            <Text fontSize="sm" mb={2}>Change Password:</Text>
            <Input
              type="password"
              placeholder="Old Password"
              bg="gray.700"
              border="none"
              focusBorderColor="teal.400"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              mb={2}
            />
            <Input
              type="password"
              placeholder="New Password"
              bg="gray.700"
              border="none"
              focusBorderColor="teal.400"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              mb={2}
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              bg="gray.700"
              border="none"
              focusBorderColor="teal.400"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Box>

          {/* Update Button */}
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={loading} // Show loading state
            loadingText="Updating..."
            isDisabled={loading || isUpdated} // Disable while updating or after success
            onClick={handleUpdate}
            leftIcon={isUpdated ? <AiOutlineCheck /> : loading ? <AiOutlineLoading3Quarters /> : null} // Show success tick or loading spinner
          >
            {isUpdated ? 'Updated' : 'Update Profile'}
          </Button>

          {/* Error Message */}
          {error && (
            <Text mt={4} color="red.500" fontSize="sm">
              There was an error updating your profile. Please try again.
            </Text>
          )}
        </Flex>
      </Box>
    </Layout>
  );
};

export default Profile;
