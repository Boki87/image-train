import React, { useRef } from 'react'
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button
} from '@chakra-ui/react'
import { usePresetsContext } from '../store'

export default function DeletePresetDialog() {
  const { showDeletePresetDialog, closeDeletePreset, deletePreset } = usePresetsContext()
  const cancelRef = useRef()

  return (
    <AlertDialog isOpen={showDeletePresetDialog} leastDestructiveRef={cancelRef} onClose={closeDeletePreset}>
      <AlertDialogOverlay>
        <AlertDialogContent bg="gray.600" color="gray.50">
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Preset
          </AlertDialogHeader>

          <AlertDialogBody>Are you sure you want to delete this preset?</AlertDialogBody>

          <AlertDialogFooter>
            <Button bg="gray.500" _hover={{ bg: 'gray.400' }} ref={cancelRef} onClick={closeDeletePreset}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={deletePreset} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
