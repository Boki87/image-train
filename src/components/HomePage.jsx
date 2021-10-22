import React, { useEffect, useState } from 'react';
import { Box, Button, Center, Spinner } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import PresetCard from './PresetCard';

import AddNewPresetButton from './AddNewPresetButton';
export default function Home() {
  const [isLoadingPresets, setIsLoadingPresets] = useState(false);
  const [presets, setPresets] = useState([]);

  useEffect(() => {
    setIsLoadingPresets(true);
    window.ipcRenderer.send('GET_PRESETS');
  }, []);

  useEffect(() => {
    if (isLoadingPresets) {
      window.Main.on('GET_PRESETS_REPLY', (message) => {
        setPresets(message);
        setIsLoadingPresets(false);
      });
    }
  }, [isLoadingPresets]);

  return (
    <Box w="full" h="full">
      {isLoadingPresets && (
        <Center h="full">
          <Spinner color="green.500" size="xl" thickness="3px" />
        </Center>
      )}

      {!isLoadingPresets && (
        <Box>
          {presets.map((p) => (
            <PresetCard data={p} key={p.id} />
          ))}
        </Box>
      )}

      <Link to="/new-preset">
        <AddNewPresetButton />
      </Link>
    </Box>
  );
}
