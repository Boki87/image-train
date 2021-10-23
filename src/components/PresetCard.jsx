import React, { useEffect, useState } from 'react'
import {
  Box,
  Heading,
  Flex,
  Button,
  Center,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  Popover,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  OrderedList,
  ListItem,
  Spinner
} from '@chakra-ui/react'
import { useDropzone } from 'react-dropzone'
import { EditIcon, InfoIcon, DeleteIcon } from '@chakra-ui/icons'
import { actionTypeName } from '../utils'
import { usePresetsContext } from '../store'

function imageValidator(file) {
  if (!file.type.includes('image')) {
    return {
      code: 'not-image',
      message: 'File must be a valid image'
    }
  }
  return null
}

export default function PresetCard({ data }) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ validator: imageValidator })

  const [isProcessing, setIsProcessing] = useState(false)

  const { openDeletePreset } = usePresetsContext()

  useEffect(() => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      console.log('process images')
      window.ipcRenderer.send('RUN_ACTIONS', { actions: data.actions, images: acceptedFiles.map((img) => img.path) })
      setIsProcessing(true)
    } else {
      console.log('abort process images')
      setIsProcessing(false)
    }
  }, [acceptedFiles])

  useEffect(() => {
    if (isProcessing) {
      window.Main.on('RUN_ACTIONS_REPLY', (message) => {
        setIsProcessing(false)
      })
    }
  }, [isProcessing])

  return (
    <Flex
      w="full"
      maxW="300px"
      h="300px"
      bg="gray.700"
      borderRadius="md"
      py="3"
      px="4"
      direction="column"
      color="gray.100"
    >
      <Heading as="h3" size="md" my="2" textAlign="center">
        {data.name}
      </Heading>
      <div
        {...getRootProps()}
        style={{
          border: '2px dashed var(--chakra-colors-green-100)',
          flex: '1',
          background: 'var(--chakra-colors-gray-600)'
        }}
      >
        <Center h="full">
          <input {...getInputProps()} />
          {!isProcessing ? <p>Drop files here</p> : <Spinner size="md" color="green" />}
        </Center>
      </div>
      <Flex direction="row" justifyContent="end" mt="3" color="gray.800">
        <Button onClick={() => openDeletePreset(data.id)} size="sm" colorScheme="green" ml="2">
          <DeleteIcon />
        </Button>
        <Popover>
          <PopoverTrigger>
            <Button size="sm" colorScheme="green" ml="2">
              <InfoIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>
              <span>Actions:</span>
            </PopoverHeader>
            <PopoverBody>
              <OrderedList>
                {data.actions.map((action) => (
                  <ListItem key={action.id}>{actionTypeName(action.type)}</ListItem>
                ))}
              </OrderedList>
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <Button size="sm" colorScheme="green" ml="2">
          <EditIcon />
        </Button>
      </Flex>
    </Flex>
  )
}
