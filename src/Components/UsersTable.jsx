import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Flex,
  IconButton,
  Input,
  Select,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useToast,
} from "@chakra-ui/react";
import { AiOutlineDelete, AiOutlineUserAdd, AiOutlineUser } from "react-icons/ai";
import api from "../axios"; // Assuming you have axios setup for API calls

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const { isOpen: isPromoteDemoteOpen, onOpen: onPromoteDemoteOpen, onClose: onPromoteDemoteClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState(null);
  const [promoteDemoteUser, setPromoteDemoteUser] = useState(null);
  const toast = useToast();

  useEffect(() => {
    api.get('/getusers')
    .then(response => {
      setUsers(response.data.users);
      })
      .catch(error => {
        console.error(error);
        });
  }, []); // Fetch users when component mounts

  // Handle delete action
  const handleDelete = (user) => {
    setSelectedUser(user);
    onDeleteOpen();
  };

  const confirmDelete = async () => {
    try {
      // Send delete request to backend
      await api.delete(`/users/${selectedUser._id}`);
      setUsers(users.filter(user => user.id !== selectedUser.id)); // Update local state
      toast({
        title: "User deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onDeleteClose(); // Close modal after delete action
    } catch (error) {
      toast({
        title: "Error deleting user",
        description: error.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Handle promote/demote action
  const handlePromoteDemote = (user) => {
    setPromoteDemoteUser(user);
    onPromoteDemoteOpen();
  };

  const confirmPromoteDemote = async (user) => {
    try {
      const action = user.role === "user" ? "promote" : "demote";
      // Send promote/demote request to backend
      await api.put(`/users/changerole/${user.id}`, { action });
      const updatedRole = action === "promote" ? "admin" : "user";
      toast({
        title: `${user.name} has been ${updatedRole === "admin" ? "promoted to" : "demoted to"} ${updatedRole}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onPromoteDemoteClose(); // Close modal after action
    } catch (error) {
      toast({
        title: "Error changing role",
        description: error.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const filteredUsers = users
  .filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(user => (filterRole ? user.role === filterRole : true));

  return (
    <Box p={4} overflowX="auto">
      {/* Table Header */}
      <Text fontSize="md" fontWeight="bold" mb={4}>
        User List
      </Text>

      {/* Search and Filter */}
      <Flex gap={4} mb={4}>
        <Input
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          width="30%"
        />
        <Select
          placeholder="Filter by role"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          width="30%"
          border="1px solid gray"
          textColor={'gray.600'}
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </Select>
      </Flex>

      {/* Users Table */}
      <Table variant="striped" colorScheme="gray" size="sm" border="1px solid white" textColor="gray.900">
        <Thead bg="gray.700">
          <Tr>
            <Th fontSize="sm" py={4} color="white">SN</Th>
            <Th fontSize="sm" py={4} color="white">Name</Th>
            <Th fontSize="sm" py={4} color="white">Email</Th>
            <Th fontSize="sm" py={4} color="white">Joined Date</Th>
            <Th fontSize="sm" py={4} color="white">Is Admin</Th>
            <Th fontSize="sm" py={4} color="white">Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredUsers.map((user, index) => (
            <Tr key={user.id} _odd={{ bg: "gray.100" }} _even={{ bg: "gray.200" }}>
              <Td fontSize="sm" py={3}>{index + 1}</Td>
              <Td fontSize="sm" py={3}>{user.name}</Td>
              <Td fontSize="sm" py={3}>{user.email}</Td>
              <Td fontSize="sm" py={3}>{new Date(user.createdAt).toLocaleDateString('en-US') }</Td>
              <Td fontSize="sm" py={3}>{user.role === "admin" ? "Yes" : "No"}</Td>
              <Td fontSize="sm" py={3}>
                <Flex gap={2}>
                  {/* Promote/Demote Action */}
                  <IconButton
                    icon={user.role === "User" ? <AiOutlineUserAdd /> : <AiOutlineUser />}
                    colorScheme={user.role === "User" ? "blue" : "yellow"}
                    size="sm"
                    aria-label="Promote/Demote"
                    onClick={() => handlePromoteDemote(user)} // Handle role change
                  />
                  {/* Delete Action */}
                  <IconButton
                    icon={<AiOutlineDelete />}
                    colorScheme="red"
                    size="sm"
                    aria-label="Delete"
                    onClick={() => handleDelete(user)} // Trigger delete
                  />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete User</ModalHeader>
          <ModalBody>
            <Text>
              Are you sure you want to delete the user: <strong>{selectedUser?.name}</strong>?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onDeleteClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={confirmDelete}>
              Confirm Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Promote/Demote Confirmation Modal */}
      <Modal isOpen={isPromoteDemoteOpen} onClose={onPromoteDemoteClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Promote/Demote User</ModalHeader>
          <ModalBody>
            <Text>
              Are you sure you want to {promoteDemoteUser?.role === "User" ? "promote" : "demote"}{" "}
              <strong>{promoteDemoteUser?.name}</strong> to{" "}
              {promoteDemoteUser?.role === "User" ? "Admin" : "User"}?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onPromoteDemoteClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={() => confirmPromoteDemote(promoteDemoteUser)}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default UserTable;
