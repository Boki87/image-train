import React from 'react';
import { Box, Center } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

export default function AddNewPresetButton(props) {
  return (
    <Box
      {...props}
      borderRadius="full"
      bg="green.500"
      w="60px"
      h="60px"
      cursor="pointer"
      shadow="sm"
      color="gray.100"
      position="absolute"
      bottom="20px"
      right="20px"
      _hover={{ bg: 'green.400' }}
      _active={{ bg: 'green.600' }}
    >
      <Center h="full">
        <AddIcon />
      </Center>
    </Box>
  );
}
