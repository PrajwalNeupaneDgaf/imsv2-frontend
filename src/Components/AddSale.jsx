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
import { paymentType } from "../Utils";

const UpdateSale = ({ isOpen, onClose, saleData, triggerMe }) => {
  const [formData, setFormData] = useState({
    soldTo: "",
    buyerEmail: "",
    itemId: "",
    price: 0,
    itemsSold: 1,
    discount: 0,
    paidPrice: 0,
    paymentType: "",
    isPaid: false,
  });

  const [items, setItems] = useState([]);
  const toast = useToast();

  // Fetch inventory items for the dropdown
  useEffect(() => {
    if (isOpen) {
      api
        .get("/inventory")
        .then((response) => setItems(response.data))
        .catch((err) => console.error("Error fetching inventory:", err));
    }
  }, [isOpen]);

  // Fetch sale data for updating when modal opens
  useEffect(() => {
    if (saleData && isOpen) {
      const {
        name,
        email,
        item_id,
        price,
        itemsSold,
        discount,
        paidPrice,
        paymentType,
        isPaid,
      } = saleData;
      setFormData({
        soldTo: name || "",
        buyerEmail: email || "",
        itemId: item_id || "",
        price: price || 0,
        itemsSold: itemsSold || 1,
        discount: discount || 0,
        paidPrice: paidPrice || 0,
        paymentType: paymentType || "",
        isPaid: isPaid || false,
      });
    }
  }, [saleData, isOpen]);

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
      // Send API request to update sale data
      await api.put(`/sales/${saleData._id}`, formData);
      triggerMe(); // Trigger any refresh or state update in parent component

      toast({
        title: "Sale Updated.",
        description: "The sale details have been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose(); // Close modal after success
    } catch (error) {
      toast({
        title: "Error updating sale.",
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
        <ModalHeader>Update Sale</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="soldTo"
                value={formData.soldTo}
                onChange={handleChange}
                placeholder="Client's Name"
                bg="gray.700"
                borderColor="gray.600"
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="buyerEmail"
                value={formData.buyerEmail}
                onChange={handleChange}
                placeholder="Client's Email"
                bg="gray.700"
                borderColor="gray.600"
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Item</FormLabel>
              <Select
                name="itemId"
                value={formData.itemId}
                onChange={handleChange}
                placeholder="Select Item"
                textColor="gray.500"
                bg="gray.700"
                borderColor="gray.600"
              >
                {items.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
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
                name="itemsSold"
                value={formData.itemsSold}
                onChange={handleChange}
                placeholder="Quantity"
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
                placeholder="Discount (%)"
                bg="gray.700"
                borderColor="gray.600"
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Paid Price</FormLabel>
              <Input
                type="number"
                name="paidPrice"
                value={formData.paidPrice}
                onChange={handleChange}
                placeholder="Paid Price"
                bg="gray.700"
                borderColor="gray.600"
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Payment Type</FormLabel>
              <Select
                name="paymentType"
                value={formData.paymentType}
                onChange={handleChange}
                placeholder="Select Payment Type"
                bg="gray.700"
                borderColor="gray.600"
              >
                {paymentType.map((type, index) => (
                  <option key={index} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl display="flex" alignItems="center" mt={4}>
              <FormLabel htmlFor="isPaid" mb="0">
                Mark as Paid
              </FormLabel>
              <Switch
                id="isPaid"
                name="isPaid"
                isChecked={formData.isPaid}
                onChange={handleChange}
              />
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Update Sale
          </Button>
          <Button variant="outline" ml={3} onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateSale;
