
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {Retirada} from './pages/Retirada/Retirada'
import { RevisaoRetirada } from './pages/RevisaoRetirada/RevisaoRetirada'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: `'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif`,
    body: `'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif`,
  },
  fontWeights: {
    normal: 400,
    bold: 700,
  },
})

function App() {
  return (
    <>
      <Router>
        <ChakraProvider theme={theme}>
          <Routes>
            <Route path='/retirada' element={<Retirada />}/>
            <Route path='/retirada/revisao' element={<RevisaoRetirada />}/>
          </Routes>
        </ChakraProvider>
      </Router>

    </>
  )
}

export default App
