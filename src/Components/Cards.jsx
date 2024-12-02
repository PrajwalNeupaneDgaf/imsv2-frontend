import React from 'react';
import { Box, Text, Icon, Tooltip } from '@chakra-ui/react';
import { FaInfoCircle } from 'react-icons/fa'; // Small info icon for the corner

const Cards = ({Title , Description , Info}) => {
  return (
    <Box
      bg="gray.800" // Dark background
      borderRadius="lg"
      boxShadow="lg"
      p={4}
      w={'100%'}
      textAlign="center"
      position="relative" // To position the info icon
      cursor="pointer"
      _hover={{
        bg: "gray.700", // Slightly lighter on hover
      }}
    >
      {/* Tooltip with small info icon in the corner */}
      <Tooltip
        label={Info}
        fontSize="sm"
        bg="teal.500"
        color="white"
        placement="top-end"
      >
        <Box position="absolute" top={2} right={2}>
          <Icon as={FaInfoCircle} boxSize={4} color="gray.400" _hover={{ color: "teal.300" }} />
        </Box>
      </Tooltip>

      <Text fontSize="lg" fontWeight="bold" color="white">
        {Title}
      </Text>
      {/* Description */}
      <Text fontSize="sm" color="gray.400" mt={2}>
       {Description}
      </Text>
    </Box>
  );
};

export default Cards;
