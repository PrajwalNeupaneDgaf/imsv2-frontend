import React, { useState } from 'react';
import { 
  Modal, ModalOverlay, ModalContent, ModalHeader, 
  ModalFooter, ModalBody, Button, FormControl, 
  FormLabel, Input, useToast, useDisclosure 
} from "@chakra-ui/react";
import api from '../axios'

const AddSupplier = ({ isOpen, onClose,trigger , settrigger }) => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    businessName: '',
    businessEmail: '',
    website: '',
    address: '',
  });

  const toast = useToast();

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/suppliers', formData);
      settrigger(!trigger)
      toast({
        title: "Supplier Added.",
        description: "The supplier has been added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose(); // Close modal on success
    } catch (error) {
      toast({
        title: "Error occurred.",
        description: error.response ? error.response.data.message : "Something went wrong.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent bg="gray.800" color="white">
        <ModalHeader>Add Supplier</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Supplier Name"
                bg="gray.700"
                borderColor="gray.600"
                color="white"
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Contact</FormLabel>
              <Input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Supplier Contact"
                bg="gray.700"
                borderColor="gray.600"
                color="white"
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Supplier Email"
                bg="gray.700"
                borderColor="gray.600"
                color="white"
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Business Name</FormLabel>
              <Input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="Business Name"
                bg="gray.700"
                borderColor="gray.600"
                color="white"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Business Email</FormLabel>
              <Input
                type="email"
                name="businessEmail"
                value={formData.businessEmail}
                onChange={handleChange}
                placeholder="Business Email (Optional)"
                bg="gray.700"
                borderColor="gray.600"
                color="white"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Website</FormLabel>
              <Input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="Website (Optional)"
                bg="gray.700"
                borderColor="gray.600"
                color="white"
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Address</FormLabel>
              <Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Supplier Address"
                bg="gray.700"
                borderColor="gray.600"
                color="white"
              />
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Add Supplier
          </Button>
          <Button className='px-4 mx-4' variant="white" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddSupplier;
