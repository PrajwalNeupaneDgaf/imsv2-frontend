import React, { useState, useEffect } from 'react';
import { Box, Text, VStack, HStack, Button, Table, Thead, Tbody, Tr, Th, Td, useToast } from "@chakra-ui/react";
import Layout from '../Layout/Layout';
import api from '../axios';
import { useParams } from 'react-router-dom';

const SupplierDetails = ({ supplierId }) => {
  const {id} = useParams()
  // Demo Supplier Data
 const [SupplierData, setSupplier] = useState({});
 const [PurchaseHistory, setPurchaseHistory] = useState([]);


 useEffect(()=>{
  api.get(`suppliers/${id}`)
  .then(response => {
    setSupplier(response.data);
    })
    .catch(error => {
      console.error(error);
      });
 },[])

 useEffect(()=>{
  api.get(`purchases/${id}`)
  .then(response => {
    setPurchaseHistory(response.data);
    })
    .catch(error => {
      console.error(error);
      });
 },[])

  const calculateInvoiceStatus = (purchases) => {
    const totalAmount = purchases.reduce((acc, purchase) => acc + purchase.totalAmount, 0);
    const paidAmount = purchases.reduce((acc, purchase) => acc + purchase.paidAmount, 0);
    return totalAmount - paidAmount > 0 ? "Due" : "Cleared";
  };

  const invoiceStatus = calculateInvoiceStatus(PurchaseHistory);

  return (
    <Layout loading={false}>
    <Box p={5} bg="gray.800" color="white" borderRadius="md">
      <VStack spacing={4} align="flex-start">
        <Text fontSize="2xl" fontWeight="bold">Supplier Details</Text>

        {/* Supplier Info */}
        <Box w="full" p={4} bg="gray.700" borderRadius="md">
          <Text>Name: {SupplierData?.name}</Text>
          <Text>Contact: {SupplierData?.contact}</Text>
          <Text>Email: {SupplierData?.email}</Text>
          <Text>Business Name: {SupplierData?.businessName}</Text>
          <Text>Business Email: {SupplierData?.businessEmail}</Text>
          <Text>Website: {SupplierData?.website || 'Not Provided'}</Text>
          <Text>Address: {SupplierData?.address}</Text>
        </Box>

        {/* Invoice Status */}
        <Box w="full" p={4} bg="gray.700" borderRadius="md">
          <Text fontSize="lg" fontWeight="bold">Invoice Status: {invoiceStatus}</Text>
          {invoiceStatus === "Due" && (
            <Text color="red.400">There are outstanding payments to this supplier.</Text>
          )}
          {invoiceStatus === "Cleared" && (
            <Text color="green.400">All payments to this supplier have been cleared.</Text>
          )}
        </Box>

        {/* Purchase History */}
        <Box w="full" p={4} bg="gray.700" borderRadius="md">
          <Text fontSize="lg" fontWeight="bold">Purchase History</Text>
          <Table variant="simple" mt={4}>
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Item Name</Th>
                <Th>Total Amount</Th>
                <Th>Paid Amount</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {PurchaseHistory?.map((purchase) => (
                <Tr key={purchase._id}>
                  <Td>{new Date(purchase.date).toLocaleDateString()}</Td>
                  <Td>{purchase.itemName}</Td>
                  <Td>{purchase.totalAmount}</Td>
                  <Td>{purchase.paidAmount}</Td>
                  <Td>{purchase.paidAmount === purchase.totalAmount ? "Paid" : "Pending"}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </VStack>
    </Box>
    </Layout>
  );
};

export default SupplierDetails;
