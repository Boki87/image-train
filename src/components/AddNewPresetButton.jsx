import React from 'react'
import { Box, Center } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { usePresetsContext } from '../store'

export default function AddNewPresetButton(props) {
  const { addNewPreset } = usePresetsContext()

  return (
    <Box
      onClick={addNewPreset}
      {...props}
      borderRadius="full"
      bg="green.500"
      w="60px"
      h="60px"
      cursor="pointer"
      shadow="sm"
      color="gray.100"
      position="fixed"
      bottom="20px"
      right="20px"
      _hover={{ bg: 'green.400' }}
      _active={{ bg: 'green.600' }}
    >
      <Center h="full">
        <AddIcon />
      </Center>
    </Box>
  )
}
