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
  useToast,
  Switch,
  Select,
} from "@chakra-ui/react";
import api from "../axios";

const AddPurchase = ({ isOpen, onClose, items ,triggerMe}) => {
  const [isNew, setIsNew] = useState(true);
  const [suppliers, setSuppliers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    supplier_id: "",
    price: 0,
    quantity: 0,
    subUnit: 0,
    description: "",
    isPaid: false,
    paidPrice: 0,
    discount: 0,
    item_id: "", // For existing purchase
  });

  const [existingItems ,setExistingItems] = useState([])

  const toast = useToast();

  useEffect(()=>{
    api.get('/inventory')
    .then(response => {
      setExistingItems(response.data)
      })
      .catch(error => {
        console.error(error);
        });
  },[])

  // Fetch suppliers when modal is opened
  useEffect(() => {
    if (isOpen) {
      api
        .get("/suppliers")
        .then((response) => setSuppliers(response.data))
        .catch((error) => {
          console.error(error);
          toast({
            title: "Error loading suppliers.",
            description: "Failed to fetch supplier data.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
        triggerMe()
    }
  }, [isOpen]);

  // Handle input changes
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
      if (isNew) {
        await api.post("/purchase", { ...formData, isExisting: false });
      } else {
        await api.post("/purchase", { itemId: formData.item_id, ...formData, isExisting: true });
      }
      toast({
        title: "Purchase Added.",
        description: isNew
          ? "New purchase has been added successfully."
          : "Existing purchase has been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose(); // Close modal on success
    } catch (error) {
      console.error(error);
      toast({
        title: "Error occurred.",
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
        <ModalHeader>{isNew ? "Add New Purchase" : "Add Existing Purchase"}</ModalHeader>
        <ModalBody>
          <FormControl display="flex" alignItems="center" mb={4}>
            <FormLabel htmlFor="isNew" mb="0">
              New Purchase
            </FormLabel>
            <Switch
              id="isNew"
              colorScheme="blue"
              isChecked={isNew}
              onChange={() => setIsNew(!isNew)}
            />
          </FormControl>

          <form onSubmit={handleSubmit}>
            {isNew ? (
              <>
                <FormControl isRequired>
                  <FormLabel>Name</FormLabel>
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
                    textColor="gray.500"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Other">Other</option>
                  </Select>
                </FormControl>
              </>
            ) : (
              <FormControl isRequired>
                <FormLabel>Item</FormLabel>
                <Select
                  name="item_id"
                  value={formData.item_id}
                  onChange={(e)=>{
                    const p = existingItems.map((item)=>{
                      if(item._id === e.target.value){
                        return item
                        }
                    })
                    setFormData({...formData,supplier_id:p[0].supplier_id,description:p[0].description, price:parseInt(p[0].price),subUnit:parseInt(p[0].subUnit),item_id:e.target.value})
                  }}
                  placeholder="Select Item"
                  bg="gray.700"
                  borderColor="gray.600"
                  textColor="gray.500"
                >
                  {existingItems?.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            )}

            <FormControl isRequired mt={4}>
              <FormLabel>Supplier</FormLabel>
              <Select
                name="supplier_id"
                value={formData.supplier_id}
                onChange={handleChange}
                placeholder="Select Supplier"
                bg="gray.700"
                borderColor="gray.600"
                textColor="gray.500"
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

            <FormControl mt={4}>
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
                onChange={handleChange}
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
            {isNew ? "Add New Purchase" : "Add Existing Purchase"}
          </Button>
          <Button variant="outline" textColor="gray.500" ml={3} onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddPurchase;
