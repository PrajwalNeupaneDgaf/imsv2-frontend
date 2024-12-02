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
  Text,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineEye } from "react-icons/ai"; // React Icons
import api from '../axios'

const fontSizes = {
  heading: "md",
  subHeading: "sm",
  text: "sm",
};

const SupplierTable = ({setIsOpen,setSupplierData , setIsOpenEdit,trigger}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [suppliers, setsuppliers] = useState([])

  useEffect(()=>{
    api.get('/suppliers')
    .then(res=>{
      setsuppliers(res.data)
    }).catch(err=>{
      console.warn(err.response.data.message)
    })
  },[trigger])

  // Filtering and Pagination Logic
  const filteredData = suppliers.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const toast = useToast()

  const handleDelete = (supplier) => {
    setSelectedSupplier(supplier);
    onOpen(); // Open the confirmation modal when delete is clicked
  };
 
  const confirmDelete = () => {
    api.delete(`./suppliers/${selectedSupplier._id}`)
    .then(res=>{
      onClose();
      toast({
        title: 'Supplier Deleted',
        description: 'Supplier has been deleted successfully',
        status: 'success',
        duration: 2000,
        isClosable:true
      })
      setIsOpen(false);
      setIsOpenEdit(false);
      api.get('/suppliers')
      .then(res=>{
        setsuppliers(res.data)
        }).catch(err=>{
          console.warn(err.response.data.message)
          })
          }).catch(err=>{
            console.warn(err.response.data.message)
            toast({
              title: 'Error',
              description:err.response.data.message ||'Supplier Not deleted',
              status: 'error',
              duration: 2000,
              isClosable:true
            })
            })
    onClose(); // Close the modal after confirming the delete
  };

  return (
    <Box p={4} overflowX="auto">
      {/* Table Header */}
      <Text fontSize={fontSizes.heading} fontWeight="bold" mb={4}>
        Supplier List
      </Text>

      {/* Search Bar */}
      <Flex mb={4} alignItems="center" justifyContent="space-between">
        <Input
          color={"gray.500"}
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          width="30%"
          fontSize={fontSizes.text}
        />
        <Button colorScheme="blue" size="sm" onClick={()=>{
          setIsOpen(true);
        }}>
          Add New
        </Button>
      </Flex>

      {/* Supplier Table */}
      <Table variant="striped" colorScheme="gray" size="sm" border="1px solid white" textColor={"gray.900"}>
        <Thead bg="gray.700">
          <Tr>
            <Th fontSize={fontSizes.subHeading} py={4} color="white">SN</Th>
            <Th fontSize={fontSizes.subHeading} py={4} color="white">Name</Th>
            <Th fontSize={fontSizes.subHeading} py={4} color="white">Business Email</Th>
            <Th fontSize={fontSizes.subHeading} py={4} color="white">Contact</Th>
            <Th fontSize={fontSizes.subHeading} py={4} color="white">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedData.map((item, index) => (
            <Tr key={index} _odd={{ bg: "gray.100" }} _even={{ bg: "gray.200" }}>
              <Td fontSize={fontSizes.text} py={3}>{index + 1}</Td>
              <Td fontSize={fontSizes.text} py={3}>{item.name}</Td>
              <Td fontSize={fontSizes.text} py={3}>{item.businessEmail}</Td>
              <Td fontSize={fontSizes.text} py={3}>{item.contact}</Td>
              <Td fontSize={fontSizes.text} py={3}>
                <Flex gap={2}>
                  <IconButton
                    onClick={()=>{
                      setSupplierData(item)
                      setIsOpenEdit(true)
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
                    onClick={()=>{
                      location.href = `/supplier/${item._id}`
                    }}
                    colorScheme="green"
                    size="sm"
                    aria-label="View"
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
          <ModalHeader>Delete Supplier</ModalHeader>
          <ModalBody>
            <Text>
              Are you sure you want to delete the supplier:{" "}
              <strong>{selectedSupplier?.name}</strong>?
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

export default SupplierTable;
