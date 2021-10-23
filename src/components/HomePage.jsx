import React, { useEffect, useState } from 'react'
import { Box, SimpleGrid, Center, Spinner, AlertDialog } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { usePresetsContext } from '../store'
import PresetCard from './PresetCard'
import AddNewPresetButton from './AddNewPresetButton'
import DeletePresetDialog from './DeletePresetDialog'

export default function Home() {
  const { isLoadingPresets, presets } = usePresetsContext()

  return (
    <Box w="full" h="full">
      {isLoadingPresets && (
        <Center h="full">
          <Spinner color="green.500" size="xl" thickness="3px" />
        </Center>
      )}

      {!isLoadingPresets && (
        <SimpleGrid columns={{ sm: 2, md: 3, lg: 4, xl: 6 }} gap="4" pb="150px">
          {presets.map((p) => (
            <Center key={`preset_card_` + p.id}>
              <PresetCard data={p} key={p.id} />
            </Center>
          ))}
        </SimpleGrid>
      )}

      <AddNewPresetButton />
      <DeletePresetDialog />
    </Box>
  )
}
