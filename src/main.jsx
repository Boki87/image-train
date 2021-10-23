import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import Store from './store'

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <Store>
        <App />
      </Store>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
