import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Button,
  useToast,
  Divider,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import api from "../axios";

const SaleDetails = ({ saleId }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const [SaleData ,setSaleData] = useState({})
  const [PurchaseData ,setPurchaseData] = useState({})

const {id} = useParams()

useEffect(()=>{
  api.get(`/sales/${id}`)
  .then(res=>{
   const data = res?.data?.data
   setSaleData(res.data.data)
   api.get(`/purchase/${data.Item.purchase_id}`)
   .then(res=>{
    const purchaseData = res.data
    setPurchaseData(purchaseData)
    })
    .catch(err=>{
      console.log(err)
   })
  })
  .catch(errr=>{
    console.log(errr)
  })
},[])

  // Mock Data
  const demoPurchaseData = {
    itemName: "Office Chair",
    category: "Furniture",
    purchasePrice: 120,
    purchaseQuantity: 10,
    subUnits: 1,
    discount: 10, // Percentage discount
    supplierName: "Supplier One",
    purchaseDate: "2024-09-15",
  };

  const calculateDiscountAmount = (price, discount) => {
    return (price * discount) / 100;
  };

  const discountAmount = calculateDiscountAmount(demoPurchaseData.purchasePrice, demoPurchaseData.discount);
  const finalPriceAfterDiscount = demoPurchaseData.purchasePrice - discountAmount;

  return (
    <Layout loading={false}>
      <Box p={5} bg="gray.800" color="white" borderRadius="md">
        <VStack spacing={6} align="flex-start">
          {/* Sale Details */}
          <Text fontSize="2xl" fontWeight="bold">
            Sale Details
          </Text>

          <Box w="full" p={4} bg="gray.700" borderRadius="md">
            <Text fontSize="lg" fontWeight="bold">Sold Item Information</Text>
            <Box mb={4} p={3} bg="gray.600" borderRadius="md">
              <Text><strong>Item Name:</strong> {SaleData?.Item?.name}</Text>
              <Text><strong>Category:</strong> {SaleData?.Item?.category}</Text>
              <Text><strong>Sold Price:</strong> ${SaleData.price}</Text>
              <Text><strong>Sold Price perItem:</strong> ${SaleData.price/SaleData.itemsSold}</Text>
              <Text><strong>Received Price:</strong> ${SaleData.paidPrice}</Text>
              <Text><strong>Discount:</strong> {SaleData.discount || '0%'}</Text>
              <Text><strong>Sold Quantity:</strong> {SaleData.itemsSold}</Text>
              <Text><strong>Sub Units:</strong> {SaleData.Item?.subUnit}</Text>
              <Text><strong>Sale Date:</strong> {new Date(SaleData.createdAt).toLocaleDateString()}</Text>
            </Box>
          </Box>

          {/* Divider */}
          <Divider borderColor="gray.600" />

          {/* Purchase Details */}
          <Text fontSize="2xl" fontWeight="bold">
            Purchase Details
          </Text>

          <Box w="full" p={4} bg="gray.700" borderRadius="md">
            <Text fontSize="lg" fontWeight="bold">Purchased Item Information</Text>
            <Box mb={4} p={3} bg="gray.600" borderRadius="md">
              <Text><strong>Item Name:</strong> {PurchaseData.name}</Text>
              <Text><strong>Category:</strong> {PurchaseData.category}</Text>
              <Text><strong>Purchase Price:</strong> ${PurchaseData.price}</Text>
              <Text><strong>Purchase Price Per:</strong> ${PurchaseData.price/PurchaseData.quantity}</Text>
              <Text><strong>Purchase Quantity:</strong> {PurchaseData.quantity}</Text>
              <Text><strong>Sub Units:</strong> {PurchaseData.subUnit}</Text>
              <Text><strong>Supplier Name:</strong> {PurchaseData?.supplier_id?.name}</Text>
              <Text><strong>Purchase Date:</strong> {new Date(demoPurchaseData.purchaseDate).toLocaleDateString()}</Text>
            </Box>
          </Box>

          {/* Actions */}
          <HStack spacing={4}>
            <Button colorScheme="blue" onClick={() => navigate(`/supplier/${PurchaseData.supplier_id._id}`)}>
              View Supplier
            </Button>
            <Button variant="outline" colorScheme="red" onClick={() => toast({ title: "Feature Coming Soon!", status: "info" })}>
              Remove Supplier
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Layout>
  );
};

export default SaleDetails;
