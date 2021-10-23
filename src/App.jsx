import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import HomePage from './components/HomePage'
import NewPresetPage from './components/NewPresetPage'

export default function App() {
  return (
    <Box w="full" h="100vh" bg="gray.500" p="4">
      <HashRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/new-preset" component={NewPresetPage} />
        </Switch>
      </HashRouter>
    </Box>
  )
}
