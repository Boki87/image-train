import React, { createContext, useContext, useState, useEffect } from 'react'

const PresetsContext = createContext(null)

export const usePresetsContext = () => useContext(PresetsContext)

export default function PresetsProvider({ children }) {
  const [presets, setPresets] = useState([])
  const [isLoadingPresets, setIsLoadingPresets] = useState(false)
  const [showDeletePresetDialog, setShowDelePresetDialog] = useState(false)
  const [presetToDeleteId, setPresetToDeleteId] = useState(-1)

  function addNewPreset() {
    let incId = Math.max(...presets.map((p) => p.id)) + 1

    const newPreset = {
      id: incId,
      name: 'Edit Me',
      templateImage: {
        width: 1920,
        height: 1080
      },
      actions: []
    }

    const presetsCopy = [...presets, newPreset]
    setPresets(presetsCopy)
    window.ipcRenderer.send('SAVE_PRESETS', presetsCopy)
  }

  function openDeletePreset(id) {
    console.log(id)
    setPresetToDeleteId(id)
    setShowDelePresetDialog(true)
  }

  function closeDeletePreset() {
    setShowDelePresetDialog(false)
    setPresetToDeleteId(-1)
  }

  function deletePreset() {
    const presetsCopy = presets.filter((p) => p.id !== presetToDeleteId)
    setPresets(presetsCopy)
    window.ipcRenderer.send('SAVE_PRESETS', presetsCopy)
  }

  useEffect(() => {
    window.Main.on('SAVE_PRESETS_REPLY', (message) => {
      closeDeletePreset()
    })
  }, [])

  useEffect(() => {
    setIsLoadingPresets(true)
    window.ipcRenderer.send('GET_PRESETS')
  }, [])

  useEffect(() => {
    if (isLoadingPresets) {
      window.Main.on('GET_PRESETS_REPLY', (message) => {
        setPresets(message)
        setIsLoadingPresets(false)
      })
    }
  }, [isLoadingPresets])

  return (
    <PresetsContext.Provider
      value={{
        presets,
        isLoadingPresets,
        showDeletePresetDialog,
        addNewPreset,
        openDeletePreset,
        closeDeletePreset,
        deletePreset
      }}
    >
      {children}
    </PresetsContext.Provider>
  )
}
