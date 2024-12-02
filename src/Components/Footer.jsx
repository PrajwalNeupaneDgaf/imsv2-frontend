import React from "react";
import { Box, Text, Center } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      bg="gray.800"
      color="white"
      py={4}
      pt={6}
      textAlign="center"
      borderTop="1px solid"
      borderColor="gray.700"
    >
      <Center>
        <Box>
          <Text fontSize="lg" fontWeight="bold">
            IMS - The College Project
          </Text>
          <Text fontSize="sm" mt={2} color="gray.400">
            Developed By Team-A (Dev-Prajwal Neupane , Others(Meeru Limbu , Santosh Dhakal , Rajkumar Shahi Thakuri))
          </Text>
        </Box>
      </Center>
    </Box>
  );
};

export default Footer;
