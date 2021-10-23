import React from 'react'
import PresetsProvider, { usePresetsContext } from './PresetsProvider'

export { usePresetsContext }

export default function Store({ children }) {
  return <PresetsProvider>{children}</PresetsProvider>
}
