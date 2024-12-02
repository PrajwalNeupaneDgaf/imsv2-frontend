import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Card,
  CardHeader,
  CardBody,
  Spinner,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import api from '../axios';
import Layout from '../Layout/Layout';

const API_BASE_URL = 'http://localhost:5000/api'; // Replace with your backend API base URL

const ReportDashboard = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [salesData, setSalesData] = useState([]);
  const [purchaseData, setPurchaseData] = useState([]);
  const [profitLossData, setProfitLossData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Hardcode dark mode colors for all components
  const darkBg = '#1A202C'; // Dark background color
  const cardBg = '#2D3748'; // Card background color
  const textColor = 'white'; // Light text color for dark mode

  const fetchReports = async () => {
    setLoading(true);
    setError('');
    try {
      const [sales, purchases, profitLoss] = await Promise.all([
        api.get(`/reports/sales`, { params: { year, month } }),
        api.get(`/reports/purchases`, { params: { year, month } }),
        api.get(`/reports/profit-loss`, { params: { year, month } }),
      ]);
      setSalesData(sales.data);
      setPurchaseData(purchases.data);
      setProfitLossData(profitLoss.data);
    } catch (err) {
      setError('Failed to fetch reports. Please try again later.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, [year, month]);

  return (
    <Layout>
      <Box p={6} bg={darkBg} minHeight="100vh">
        <Text fontSize="2xl" fontWeight="bold" mb={4} color={textColor}>
          Monthly Reports Dashboard
        </Text>

        {/* Year and Month Selectors */}
        <Box mb={4} display="flex" gap={4}>
          <Select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            bg={cardBg}
            color={textColor}
            borderColor="gray.500"
            _hover={{ borderColor: 'gray.300' }}
          >
            {Array.from({ length: 5 }, (_, i) => {
              const y = new Date().getFullYear() - i;
              return (
                <option key={y} value={y}>
                  {y}
                </option>
              );
            })}
          </Select>
          <Select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            bg={cardBg}
            color={textColor}
            borderColor="gray.500"
            _hover={{ borderColor: 'gray.300' }}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </Select>
        </Box>

        {/* Error Message */}
        {error && (
          <Alert status="error" mb={4} bg="red.700" color={textColor}>
            <AlertIcon />
            {error}
          </Alert>
        )}

        {/* Loader */}
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" h="200px">
            <Spinner size="xl" color="white" />
          </Box>
        ) : (
          <>
            {/* Sales Report */}
            <Card mb={6} bg={cardBg}>
              <CardHeader>
                <Text fontSize="xl" fontWeight="bold" color={textColor}>
                  Sales Report
                </Text>
              </CardHeader>
              <CardBody>
                <Table size="sm" variant="simple" color={textColor}>
                  <Thead>
                    <Tr>
                      <Th color={textColor}>Product</Th>
                      <Th color={textColor}>Units Sold</Th>
                      <Th color={textColor}>Revenue ($)</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {salesData.map((item, index) => (
                      <Tr key={index}>
                        <Td color={textColor}>{item.product}</Td>
                        <Td color={textColor}>{item.totalItemsSold}</Td>
                        <Td color={textColor}>{item.totalRevenue}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </CardBody>
            </Card>

            {/* Purchase Report */}
            <Card mb={6} bg={cardBg}>
              <CardHeader>
                <Text fontSize="xl" fontWeight="bold" color={textColor}>
                  Purchase Report
                </Text>
              </CardHeader>
              <CardBody>
                <Table size="sm" variant="simple" color={textColor}>
                  <Thead>
                    <Tr>
                      <Th color={textColor}>Product</Th>
                      <Th color={textColor}>Units Purchased</Th>
                      <Th color={textColor}>Cost ($)</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {purchaseData.map((item, index) => (
                      <Tr key={index}>
                        <Td color={textColor}>{item._id}</Td>
                        <Td color={textColor}>{item.totalUnitsPurchased}</Td>
                        <Td color={textColor}>{item.totalCost}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </CardBody>
            </Card>

            {/* Profit and Loss Report */}
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={6}>
              <Card bg={cardBg}>
                <CardHeader>
                  <Text fontSize="xl" fontWeight="bold" color={textColor}>
                    Total Revenue
                  </Text>
                </CardHeader>
                <CardBody>
                  <Stat>
                    <StatLabel color={textColor}>Revenue</StatLabel>
                    <StatNumber color={textColor}>${profitLossData.totalRevenue || 0}</StatNumber>
                  </Stat>
                </CardBody>
              </Card>

              <Card bg={cardBg}>
                <CardHeader>
                  <Text fontSize="xl" fontWeight="bold" color={textColor}>
                    Total Cost
                  </Text>
                </CardHeader>
                <CardBody>
                  <Stat>
                    <StatLabel color={textColor}>Cost</StatLabel>
                    <StatNumber color={textColor}>${profitLossData.totalCost || 0}</StatNumber>
                  </Stat>
                </CardBody>
              </Card>

              <Card bg={cardBg}>
                <CardHeader>
                  <Text fontSize="xl" fontWeight="bold" color={textColor}>
                    Net Profit
                  </Text>
                </CardHeader>
                <CardBody>
                  <Stat>
                    <StatLabel color={textColor}>Profit</StatLabel>
                    <StatNumber color={textColor}>${profitLossData.netProfit || 0}</StatNumber>
                  </Stat>
                </CardBody>
              </Card>
            </SimpleGrid>
          </>
        )}
      </Box>
    </Layout>
  );
};

export default ReportDashboard;
