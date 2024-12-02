import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import Cards from '../Components/Cards';
import { Box } from '@chakra-ui/react';
import InventoryTable from '../Components/InventoryTable';
import { useIMS } from '../Context/IMSContext';
import LoadingScreen from '../Components/LoadingScreen';
import api from '../axios';

const Inventory = () => {
  const { isAuthenticated } = useIMS();
  const [loading, setLoading] = useState(true);
  const [inventoryData, setInventoryData] = useState({
    totalItems: 0,
    nearlyFinishedItems: 0,
    outOfStockItems: 0,
  });

  useEffect(() => {
    api
    .get('/inventory/inventory-data')
        .then((response) => {
          setInventoryData(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <LoadingScreen />;
  }

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Layout loading={loading}>
      <Box className="items-center flex gap-2 w-[100%]" flexDir={['column', 'column', 'row', 'row']}>
        <Cards
          Title={'Total Item'}
          Description={`We have Total ${inventoryData.totalItems}`}
          Info={'Total Items'}
        />
        <Cards
          Title={'Nearly Finished'}
          Description={`There are ${inventoryData.nearlyFinishedItems} items with less than 100 quantity`}
          Info={'Items with Low Stock'}
        />
        <Cards
          Title={'Out Of Stock'}
          Description={`There are ${inventoryData.outOfStockItems} items out of stock`}
          Info={'Out of Stock Items'}
        />
      </Box>
      <div>
        <InventoryTable />
      </div>
    </Layout>
  );
};

export default Inventory;
