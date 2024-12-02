import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
  Switch,
} from "@chakra-ui/react";
import api from "../axios";

const UpdatePurchase = ({ isOpen, onClose, purchaseId ,triggerMe}) => {
  const [formData, setFormData] = useState({});
  const [suppliers, setSuppliers] = useState([]);
  const toast = useToast();

  // Populate formData when modal is opened
  useEffect(() => {
    if (isOpen) {
      api.get('/suppliers')
      .then(response => {
        setSuppliers(response.data);
        })
        .catch(error => {
          console.error(error);
          });
    }
  })
  useEffect(() => {
    if (isOpen) {
      api.get(`/purchase/${purchaseId}`)
      .then((response) => {
        setFormData({...response.data,supplier_id:response.data.supplier_id._id});
        }).catch(err=>{
          console.log(err);
        }) 
    }
  }, [isOpen, purchaseId]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call to update purchase
      await api.put(`/purchase/${purchaseId}`, formData);
      triggerMe()
      toast({
        title: "Purchase Updated.",
        description: "The purchase details were successfully updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose(); // Close modal after success
    } catch (error) {
      toast({
        title: "Error updating purchase.",
        description: error.response?.data?.message || "Something went wrong.",
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
        <ModalHeader>Update Purchase - {formData.name}</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel>Item Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Item Name"
                bg="gray.700"
                borderColor="gray.600"
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Category</FormLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Select Category"
                bg="gray.700"
                borderColor="gray.600"
              >
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Furniture">Furniture</option>
                <option value="Other">Other</option>
              </Select>
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Supplier</FormLabel>
              <Select
                textColor={"gray.500"}
                name="supplier_id"
                value={formData.supplier_id}
                onChange={handleChange}
                placeholder="Select Supplier"
                bg="gray.700"
                borderColor="gray.600"
              >
                {suppliers?.map((supplier) => (
                  <option key={supplier._id} value={supplier._id}>
                    {supplier.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                bg="gray.700"
                borderColor="gray.600"
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Quantity</FormLabel>
              <Input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                bg="gray.700"
                borderColor="gray.600"
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Sub Unit</FormLabel>
              <Input
                type="number"
                name="subUnit"
                value={formData.subUnit}
                onChange={handleChange}
                placeholder="Units per Box"
                bg="gray.700"
                borderColor="gray.600"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Discount</FormLabel>
              <Input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                placeholder="Discount"
                bg="gray.700"
                borderColor="gray.600"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                bg="gray.700"
                borderColor="gray.600"
              />
            </FormControl>

            <FormControl display="flex" alignItems="center" mt={4}>
              <FormLabel htmlFor="isPaid" mb="0">
                Mark as Paid
              </FormLabel>
              <Switch
                id="isPaid"
                name="isPaid"
                isChecked={formData.isPaid}
                onChange={(e) =>
                  handleChange({
                    target: { name: "isPaid", value: e.target.checked },
                  })
                }
              />
            </FormControl>

            {formData.isPaid && (
              <FormControl isRequired mt={4}>
                <FormLabel>Paid Price</FormLabel>
                <Input
                  type="number"
                  name="paidPrice"
                  value={formData.paidPrice}
                  onChange={handleChange}
                  placeholder="Paid Amount"
                  bg="gray.700"
                  borderColor="gray.600"
                />
              </FormControl>
            )}
          </form>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Update Purchase
          </Button>
          <Button variant="outline" ml={3} onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdatePurchase;
