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
} from "@chakra-ui/react";
import api from "../axios";

const fontSizes = {
  heading: "md",
  subHeading: "sm",
  text: "sm",
};

const InventoryTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [inventoryData, setinventoryData] = useState([])

  useEffect(()=>{
    api.get('/inventory')
    .then(response => {
      console.log(response.data)
      setinventoryData(response.data)
      })
      .catch((err)=>{
        console.error(err)
      })
  },[])

  // Filtering and Pagination Logic
  const filteredData = inventoryData
    .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((item) => (filterCategory ? item.category === filterCategory : true));

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const categories = [...new Set(inventoryData.map((item) => item.category))];

  return (
    <Box p={4} overflowX="auto">
      {/* Table Header */}
      <Text fontSize={fontSizes.heading} fontWeight="bold" mb={4}>
        Inventory List
      </Text>

      {/* Search and Filter Options */}
      <Flex
        flexWrap="wrap"
        gap={4}
        mb={4}
        alignItems="center"
        justifyContent="space-between"
      >
        <Input
        color={'gray.500'}
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
          color="gray.700" // Ensure dropdown text is black for readability
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
        <Select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          width="30%"
          fontSize={fontSizes.text}
          color="gray.600" >
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={50}>50 per page</option>
        </Select>
      </Flex>

      {/* Inventory Table */}
      <Table variant="striped" colorScheme="gray" size="sm" border="1px solid white" textColor={'gray.900'}>
        <Thead bg="gray.700">
          <Tr>
            <Th fontSize={fontSizes.subHeading} py={4} color="white">ID</Th>
            <Th fontSize={fontSizes.subHeading} py={4} color="white">Name</Th>
            <Th fontSize={fontSizes.subHeading} py={4} color="white">Category</Th>
            <Th fontSize={fontSizes.subHeading} py={4} color="white">Quantity</Th>
            <Th fontSize={fontSizes.subHeading} py={4} color="white">Sub-Quantity</Th>
            <Th fontSize={fontSizes.subHeading} py={4} color="white">Price</Th>
            <Th fontSize={fontSizes.subHeading} py={4} color="white">Last Updated</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedData.map((item,idx) => (
            <Tr className="cursor-pointer" key={item._id} _odd={{ bg: "gray.100" }} _even={{ bg: "gray.200" }} onClick={()=>{
              location.href = `/inventory/${item._id}`
            }}>
              <Td fontSize={fontSizes.text} py={3}>{idx+1}</Td>
              <Td fontSize={fontSizes.text} py={3}>{item.name}</Td>
              <Td fontSize={fontSizes.text} py={3}>{item.category}</Td>
              <Td fontSize={fontSizes.text} py={3}>{item.quantity}</Td>
              <Td fontSize={fontSizes.text} py={3}>{item.subUnit}</Td>
              <Td fontSize={fontSizes.text} py={3}>${item.price}</Td>
              <Td fontSize={fontSizes.text} py={3}>{new Date(item.updatedAt).toLocaleDateString()}</Td>
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
    </Box>
  );
};

export default InventoryTable;
