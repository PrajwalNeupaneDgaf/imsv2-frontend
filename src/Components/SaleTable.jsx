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
import { AiOutlineEdit, AiOutlineDelete, AiOutlineEye } from "react-icons/ai"; // React Icons
import api from "../axios";

const fontSizes = {
  heading: "md",
  subHeading: "sm",
  text: "sm",
};

const SaleTable = ({ setIsOpen, setSaleData, setIsOpenEdit,trigger ,triggerme }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterCustomer, setFilterCustomer] = useState("");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedSale, setSelectedSale] = useState(null);
  const [sales, setSales] = useState([]);

  useEffect(()=>{
    api.get('/sales')
    .then(response => {
      setSales(response.data.data);
      })
      .catch(error => {
        console.error(error)
        })
  },[trigger])

  // Filtering and Pagination Logic
  const filteredData = sales
    .filter((item) => item?.Item?.name?.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((item) => (filterCategory ? item?.Item.category === filterCategory : true))
    .filter((item) => (filterCustomer ? item?.SoldTo === filterCustomer : true));

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const categories = [...new Set(sales?.map((item) => item?.Item?.category))];
  const customers = [...new Set(sales?.map((item) => item?.SoldTo))];

  const toast = useToast()

  const handleDelete = (sale) => {
    setSelectedSale(sale);
    onOpen(); // Open the confirmation modal when delete is clicked
  };


  const confirmDelete = () => {
    console.log(selectedSale)
   api.delete(`/sales/${selectedSale._id}`,)
   .then((res)=>{
    toast({
      title:'Deleted',
      status:'success',
      description:`Succesfully Deleted ${selectedSale.Item.name}`,
      isClosable:true,
      duration:1000
    })
    triggerme()
   })
   .catch(err=>{
    toast({
      title:'Deleted Failed',
      status:'error',
      description:`Error Deleting the Sale ${selectedSale.Item.name}`,
      isClosable:true,
      duration:1000
    })
    console.error(err)
   })
    onClose(); // Close the modal after confirming the delete
  };

  return (
    <Box p={4} overflowX="auto">
      {/* Table Header */}
      <Text fontSize={fontSizes.heading} fontWeight="bold" mb={4}>
        Sales List
      </Text>

      {/* Search, Filter, and Add New Sale Options */}
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
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
        <Select
          placeholder="Filter by customer"
          value={filterCustomer}
          onChange={(e) => setFilterCustomer(e.target.value)}
          width="30%"
          fontSize={fontSizes.text}
          color="gray.700"
        >
          {customers.map((customer) => (
            <option key={customer} value={customer}>
              {customer}
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

        {/* Add New Sale Button */}
        <Button
          colorScheme="blue"
          size="sm"
          onClick={() => {
            setIsOpen(true); // This opens the modal for adding a new sale
          }}
        >
          Sale New
        </Button>
      </Flex>

      {/* Sales Table */}
      <Table variant="striped" colorScheme="gray" size="sm" border="1px solid white" textColor={"gray.900"}>
        <Thead bg="gray.700">
          <Tr>
            <Th fontSize={fontSizes.subHeading} py={4} color="white">SN</Th>
            <Th fontSize={fontSizes.subHeading} py={4} color="white">Item</Th>
            <Th fontSize={fontSizes.subHeading} py={4} color="white">Category</Th>
            <Th fontSize={fontSizes.subHeading} py={4} color="white">Sold To</Th>
            <Th fontSize={fontSizes.subHeading} py={4} color="white">Sold Price</Th>
            <Th fontSize={fontSizes.subHeading} py={4} color="white">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedData.map((item, index) => (
            <Tr key={item._id} _odd={{ bg: "gray.100" }} _even={{ bg: "gray.200" }}>
              <Td fontSize={fontSizes.text} py={3}>{index + 1}</Td>
              <Td fontSize={fontSizes.text} py={3}>{item?.Item.name}</Td>
              <Td fontSize={fontSizes.text} py={3}>{item.Item.category}</Td>
              <Td fontSize={fontSizes.text} py={3}>{item.SoldTo}</Td>
              <Td fontSize={fontSizes.text} py={3}>${item.price}</Td>
              <Td fontSize={fontSizes.text} py={3}>
                <Flex gap={2}>
                  <IconButton
                    onClick={() => {
                      setSaleData( item );
                      setIsOpenEdit();
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
                      location.href = `/sale/${item._id}`;
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
          <ModalHeader>Delete Sale</ModalHeader>
          <ModalBody>
            <Text>
              Are you sure you want to delete the sale of: <strong>{selectedSale?.name}</strong>?
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

export default SaleTable;
