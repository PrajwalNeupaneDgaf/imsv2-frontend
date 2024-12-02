import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Button,
  useToast,
  Divider,
  Stack,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import api from "../axios";
import { FaExternalLinkAlt, FaTrashAlt } from "react-icons/fa";

const PurchaseDetails = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [SupplierData, setSupplierData] = useState({});
  const [purchase, setPurchase] = useState({});
  const { id } = useParams();

  useEffect(() => {
    api
      .get(`/purchase/${id}`)
      .then((res) => {
        setPurchase(res.data);
        setSupplierData(res.data.supplier_id);
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: "Error fetching data.",
          description: "Could not fetch purchase details.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }, [id]);

  return (
    <Layout loading={false}>
      <Box p={5} bg="gray.800" color="white" borderRadius="md">
        <VStack spacing={6} align="stretch">
          {/* Purchase Details */}
          <Box>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
              Purchase Details
            </Text>

            <Box p={5} bg="gray.700" borderRadius="md" shadow="md">
              <Text fontSize="lg" fontWeight="bold" mb={4}>
                Purchase Information
              </Text>

              <Stack spacing={3}>
                <Text>
                  <strong>Item Name:</strong> {purchase.name || "N/A"}
                </Text>
                <Text>
                  <strong>Category:</strong> {purchase.category || "N/A"}
                </Text>
                <Text>
                  <strong>Quantity:</strong> {purchase.quantity || "N/A"}
                </Text>
                <Text>
                  <strong>Price:</strong> ${purchase.price?.toFixed(2) || "0.00"}
                </Text>
                <Text>
                  <strong>Sub Units:</strong> {purchase.subUnit || "N/A"}
                </Text>
                <Text>
                  <strong>Paid Amount:</strong> $
                  {purchase.paidPrice?.toFixed(2) || "0.00"}
                </Text>
                <Text>
                  <strong>Status:</strong>{" "}
                  {purchase.isPaid ? (
                    <Text as="span" color="green.400" fontWeight="bold">
                      {
                        purchase.price-purchase.paidPrice <=0?'CompleteLy Paid':`Partially Paid remaining:(${purchase.price-purchase.paidPrice})`
                      }
                    </Text>
                  ) : (
                    <Text as="span" color="red.400" fontWeight="bold">
                      Unpaid to be Paid Total 
                    </Text>
                  )}
                </Text>
                <Text>
                  <strong>Description:</strong> {purchase.description || "N/A"}
                </Text>
                <Text>
                  <strong>Purchase Date:</strong>{" "}
                  {purchase.updatedAt
                    ? new Date(purchase.updatedAt).toLocaleDateString()
                    : "N/A"}
                </Text>
              </Stack>
            </Box>
          </Box>

          {/* Divider */}
          <Divider borderColor="gray.600" />

          {/* Supplier Details */}
          <Box>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
              Supplier Details
            </Text>

            <Box p={5} bg="gray.700" borderRadius="md" shadow="md">
              <Text fontSize="lg" fontWeight="bold" mb={4}>
                Supplier Information
              </Text>

              <Stack spacing={3}>
                <Text>
                  <strong>Name:</strong> {SupplierData.name || "N/A"}
                </Text>
                <Text>
                  <strong>Contact:</strong> {SupplierData.contact || "N/A"}
                </Text>
                <Text>
                  <strong>Email:</strong> {SupplierData.email || "N/A"}
                </Text>
                <Text>
                  <strong>Business Name:</strong>{" "}
                  {SupplierData.businessName || "N/A"}
                </Text>
                <Text>
                  <strong>Business Email:</strong>{" "}
                  {SupplierData.businessEmail || "N/A"}
                </Text>
                <Text>
                  <strong>Website:</strong>{" "}
                  {SupplierData.website ? (
                    <a
                      className="bg-white p-1 rounded-md text-green-600"
                      href={SupplierData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Website <Icon as={FaExternalLinkAlt} mx={1} />
                    </a>
                  ) : (
                    "Not Provided"
                  )}
                </Text>
                <Text>
                  <strong>Address:</strong> {SupplierData.address || "N/A"}
                </Text>
              </Stack>
            </Box>
          </Box>

          {/* Actions */}
          <Flex justifyContent="flex-start" mt={4}>
            <HStack spacing={4}>
              <Button
                colorScheme="blue"
                onClick={() => navigate(`/supplier/${SupplierData._id}`)}
              >
                View Supplier
              </Button>
              <Button
                variant="outline"
                colorScheme="red"
                leftIcon={<FaTrashAlt />}
                onClick={() =>
                  toast({
                    title: "Feature Coming Soon!",
                    status: "info",
                    duration: 3000,
                    isClosable: true,
                  })
                }
              >
                Remove Supplier
              </Button>
            </HStack>
          </Flex>
        </VStack>
      </Box>
    </Layout>
  );
};

export default PurchaseDetails;
