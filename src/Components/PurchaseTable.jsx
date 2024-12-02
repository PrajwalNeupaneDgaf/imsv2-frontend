import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Select,
  Text,
  Button,
  Flex,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { demoPurchases } from "../../Demo"; // Import demo purchase data
import { AiOutlineEdit, AiOutlineDelete, AiOutlineEye } from "react-icons/ai"; // React Icons
import api from "../axios";
import { categories } from "../Utils";

const fontSizes = {
  heading: "md",
  subHeading: "sm",
  text: "sm",
};

const PurchaseTable = ({ setIsOpen, setPurchaseId, setIsOpenEdit,trigger,triggerMe }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterSupplier, setFilterSupplier] = useState("");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [Purchases, setPurchases] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(()=>{
    api.get('/purchase')
    .then(response => {
      setPurchases(response.data)
      })
      .catch(error => {
        console.error(error);
        });
    api.get('/suppliers')
      .then(response => {
        setSuppliers(response.data)
        })
        .catch(error => {
          console.error(error);
          })
        

  },[trigger])

  // Filtering and Pagination Logic
  const filteredData = Purchases
    .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((item) => (filterCategory ? item.category === filterCategory : true))
    .filter((item) => (filterSupplier ? item.supplier_id.name === filterSupplier : true));

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );


  const handleDelete = (purchase) => {
    setSelectedPurchase(purchase);
    onOpen(); // Open the confirmation modal when delete is clicked
  };
  const toast = useToast()

  const confirmDelete = () => {
   api.delete(`/purchase/${selectedPurchase._id}`)
   .then(response => {
    toast({
      title: 'Purchase deleted',
      status: 'success',
      description:'Succesfully Deleted ',
      duration: 2000,
      isClosable: true,
    })
    triggerMe()
   })
   .catch(error => {
    toast({
      title: 'Error deleting purchase',
      status: 'error',
      duration: 2000,
      isClosable: true,
      description:error.response.data.message || "Error Cant Delete"
    })
    console.error(error);
    });
    onClose(); // Close the modal after confirming the delete
  };

  return (
    <Box p={4} overflowX="auto">
      {/* Table Header */}
      <Text fontSize={fontSizes.heading} fontWeight="bold" mb={4}>
        Purchase List
      </Text>

      {/* Search, Filter and Add New Purchase Options */}
      <Flex
        flexWrap="wrap"
        gap={4}
        mb={4}
        alignItems="center"
        justifyContent="space-between"
      >
        <Input
          color={"gray.500"}
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          width="30%"
          fontSize={fontSizes.text}
        />
        <Select
          placeholder="Filter by category"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          width="30%"
          fontSize={fontSizes.text}
          color="gray.700"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </Select>
        <Select
          placeholder="Filter by supplier"
          value={filterSupplier}
          onChange={(e) => setFilterSupplier(e.target.value)}
          width="30%"
          fontSize={fontSizes.text}
          color="gray.700"
        >
          {suppliers?.map((supplier,idx) => (
            <option key={idx} value={supplier.name}>
              {supplier.name}
            </option>
          ))}
        </Select>
        <Select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          width="30%"
          fontSize={fontSizes.text}
          color="gray.600"
        >
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={50}>50 per page</option>
        </Select>

        {/* Add New Purchase Button */}
        <Button
          colorScheme="blue"
          size="sm"
          onClick={() => {
            setIsOpen(true); // This opens the modal for adding a new purchase
          }}
        >
          Purchase New
        </Button>
      </Flex>

      {/* Purchase Table */}
      <Table variant="striped" colorScheme="gray" size="sm" border="1px solid white" textColor={"gray.900"}>
        <Thead bg="gray.700">
          <Tr>
            <Th fontSize={fontSizes.subHeading} py={4} color="white">SN</Th>
            <Th fontSize={fontSizes.subHeading} py={4} color="white">Item</Th>
            <Th fontSize={fontSizes.subHeading} py={4} color="white">Category</Th>
            <Th fontSize={fontSizes.subHeading} py={4} color="white">Supplier</Th>
            <Th fontSize={fontSizes.subHeading} py={4} color="white">Paid</Th>
            <Th fontSize={fontSizes.subHeading} py={4} color="white">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedData?.map((item, index) => (
            <Tr key={index} _odd={{ bg: "gray.100" }} _even={{ bg: "gray.200" }}>
              <Td fontSize={fontSizes.text} py={3}>{index + 1}</Td>
              <Td fontSize={fontSizes.text} py={3}>{item?.name}</Td>
              <Td fontSize={fontSizes.text} py={3}>{item?.category}</Td>
              <Td fontSize={fontSizes.text} py={3}>{item?.supplier_id?.name}</Td>
              <Td fontSize={fontSizes.text} py={3}>{item?.isPaid ? "Yes" : `No (Paid: $${item.paidPrice})`}</Td>
              <Td fontSize={fontSizes.text} py={3}>
                <Flex gap={2}>
                  <IconButton
                    onClick={() => {
                      setPurchaseId(item._id);
                      setIsOpenEdit(true);
                    }}
                    icon={<AiOutlineEdit />}
                    colorScheme="yellow"
                    size="sm"
                    aria-label="Edit"
                  />
                  <IconButton
                    icon={<AiOutlineDelete />}
                    colorScheme="red"
                    size="sm"
                    aria-label="Delete"
                    onClick={() => handleDelete(item)} // Trigger delete
                  />
                  <IconButton
                    icon={<AiOutlineEye />}
                    colorScheme="green"
                    size="sm"
                    aria-label="View"
                    onClick={() => {
                      location.href = `/purchase/${item._id}`;
                    }}
                  />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Pagination */}
      <Flex mt={4} justifyContent="space-between" alignItems="center">
        <Button
          size="sm"
          isDisabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </Button>
        <Text fontSize={fontSizes.text}>
          Page {page} of {totalPages}
        </Text>
        <Button
          size="sm"
          isDisabled={page === totalPages}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next
        </Button>
      </Flex>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Purchase</ModalHeader>
          <ModalBody>
            <Text>
              Are you sure you want to delete the purchase: <strong>{selectedPurchase?.name}</strong>?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={confirmDelete}>
              Confirm Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PurchaseTable;
