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
} from "@chakra-ui/react";
import api from "../axios";
import { paymentType } from "../Utils"; // Assuming this contains the payment types

const UpdateSale = ({ isOpen, onClose, saleData, triggerMe }) => {
  const [formData, setFormData] = useState({
    itemId: saleData?.itemId  || "",
    soldTo:saleData?.soldTo|| "",
    buyerEmail: saleData?.buyerEmail|| "",
    price: saleData?.price|| 0,
    itemsSold: saleData?.itemsSold|| 1,
    discount: saleData?.discount|| 0,
    paidPrice: saleData?.paidPrice || 0,
    paymentType: saleData?.paymentType|| "",
  });

  const [items, setItems] = useState([]);
  const toast = useToast();

  // Fetch item list for dropdown and sale data for update
  useEffect(() => {
    if (isOpen) {
      api
        .get("/inventory") // Fetch inventory items for dropdown
        .then((response) => setItems(response.data))
        .catch((err) => console.error("Error fetching inventory:", err));

      if (saleData) {
        api
          .get(`/sales/${saleData._id}`)
          .then((response) => {
            const saleDatas = response.data.data;
            setFormData({
              itemId: saleDatas.Item._id,
              soldTo: saleDatas.SoldTo,
              buyerEmail: saleDatas.buyerEmail,
              price: saleDatas.price,
              itemsSold: saleDatas.itemsSold,
              discount: saleDatas.discount,
              paidPrice: saleDatas.paidPrice,
              paymentType: saleDatas.paymentType,
            });
          })
          .catch((err) => console.error("Error fetching sale data:", err));
      }
    }
  }, [isOpen, saleData]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]:
        ["price", "itemsSold", "discount", "paidPrice"].includes(name)
          ? Number(value)
          : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/sales/${saleData._id}`, formData);
      toast({
        title: "Sale Updated",
        description: "The sale details have been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
     // Trigger any refresh or state update in parent component
      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error("Error updating sale:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update the sale.",
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
                textColor={'gray.500'}
                name="itemId"
                value={formData.itemId}
                onChange={handleChange}
                placeholder="Select Item"
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
                textColor={'gray.500'}
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
