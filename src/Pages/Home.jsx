import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import { useIMS } from '../Context/IMSContext';
import { Box, Text, Spinner } from '@chakra-ui/react';
import Cards from '../Components/Cards';
import SalesChart from '../Components/SalesChart';
import LowStockChart from '../Components/LowStockChart';
import axios from 'axios';
import api from '../axios';

const Home = () => {
  const { user, isAuthenticated } = useIMS();
  const [loading, setLoading] = useState(true);
  const [homeData, setHomeData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
      api
        .get('/home-page-data') // Update with your backend API endpoint
        .then((response) => {
          console.log(response)
          setHomeData(response.data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError('Error fetching data.');
        });
  }, []);


  return (
    <Layout loading={loading}>
      <Box className="items-center flex gap-2 w-[100%]" flexDir={['column', 'column', 'row', 'row']}>
        <Cards Title="Total Item" Description={`We have Total ${homeData?.totalItems}`} Info="Total Items" />
        <Cards
          Title="Total Sale"
          Description={`This week ${homeData?.totalSales.totalItemsSold} items Sold`}
          Info="Total sale this week"
        />
        <Cards Title="Total Users" Description={`We have Total ${homeData?.totalUsers} Users`} Info="Total users" />
      </Box>

      <Box className="mt-5">
        <SalesChart data={homeData?.salesChartData} />
      </Box>
      <Box className="mt-5">
        <LowStockChart data={homeData?.lowStockItems} />
      </Box>
    </Layout>
  );
};

export default Home;
