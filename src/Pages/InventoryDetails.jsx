import React, { useEffect, useState } from 'react';
import { Box, Text, Button, Link, VStack, HStack, useToast } from '@chakra-ui/react';
import api from '../axios';
import Layout from '../Layout/Layout';
import { useParams } from 'react-router-dom';

const InventoryDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [itemDetails, setItemDetails] = useState(null);
  const [error, setError] = useState(null);
  const toast = useToast();

  useEffect(() => {
    setLoading(true);
    api
      .get(`/inventory/item/${id}`)
      .then((response) => {
        setItemDetails(response.data);
        console.log(response.data)
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Error fetching item details');
        setLoading(false);
        toast({
          title: 'Error fetching data',
          description: 'There was an error fetching the item details.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  }, [id]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  const { item, purchaseHistory, saleHistory } = itemDetails;

  // Get the last purchase if there is any purchase history

  return (
    <Layout>
      <Box p={5} bg="gray.800" color="white" borderRadius="md" boxShadow="lg">
        <VStack align="start" spacing={4}>
          <Text fontSize="3xl" fontWeight="bold">
            {item?.name}
          </Text>
          <Text>Description: {item?.description}</Text>
          <Text>Price: ${item?.price}</Text>
          <Text>Quantity in Stock: {item?.quantity}</Text>
        </VStack>

        <Box mt={6}>
          <Text fontSize="xl" fontWeight="bold" mb={2}>
            Last Purchase:
          </Text>
          <Box bg="gray.700" p={4} borderRadius="md">
            {purchaseHistory ? (
              <HStack justify="space-between" p={2} borderBottom="1px solid gray">
                <Text>
                  Purchased on: {new Date(purchaseHistory?.createdAt).toLocaleDateString()} - Quantity: {purchaseHistory?.quantity}
                </Text>
                <Link to={`/purchase/${purchaseHistory._id}`}>
                  <Button onClick={()=>{
                    location.href = `/purchase/${purchaseHistory._id}`
                  }} colorScheme="teal" variant="outline">
                    View Details
                  </Button>
                </Link>
              </HStack>
            ) : (
              <Text>No purchase history available.</Text>
            )}
          </Box>
        </Box>

        <Box mt={6}>
          <Text fontSize="xl" fontWeight="bold" mb={2}>
            Sale History:
          </Text>
          <Box bg="gray.700" p={4} borderRadius="md">
            {saleHistory.length === 0 ? (
              <Text>No sale history available.</Text>
            ) : (
              saleHistory.map((sale) => (
                <HStack key={sale._id} justify="space-between" p={2} borderBottom="1px solid gray">
                  <Text>
                    Sold on: {new Date(sale?.date).toLocaleDateString()} - Quantity: {sale?.itemsSold}
                  </Text>
                  <Link>
                    <Button onClick={()=>{
                        location.href = `/sale/${sale._id}`
                    }} colorScheme="teal" variant="outline">
                      View Details
                    </Button>
                  </Link>
                </HStack>
              ))
            )}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default InventoryDetails;
