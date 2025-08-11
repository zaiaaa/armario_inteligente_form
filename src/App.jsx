
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {Retirada} from './pages/Retirada/Retirada'
import { RevisaoRetirada } from './pages/RevisaoRetirada/RevisaoRetirada'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Sucesso } from './pages/Sucesso/Sucesso'
import { Erro } from './pages/Erro/Erro'
import {NaoAutorizado} from './pages/NaoAutorizado/NaoAutorizado'
import { Devolucao } from "./pages/Devolucao/Devolucao";
import { RevisaoDevolucao } from "./pages/RevisaoDevolucao/RevisaoDevolucao";
import { VisualizarLockouts } from './pages/VisualizarLockouts/VisualizarLockouts'
import Usuarios from './pages/Usuarios/Usuarios'
import { CadastroUsuario } from './pages/CadastroUsuario/CadastroUsuario'


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
            <Route path='/retirada/sucesso' element={<Sucesso />}/>
            <Route path='/retirada/erro' element={<Erro />}/>

            <Route path='/devolucao' element={<Devolucao />}/>
            <Route path='/devolucao/revisao' element={<RevisaoDevolucao />}/>
            <Route path='/devolucao/sucesso' element={<Sucesso />}/>
            <Route path='/devolucao/erro' element={<Erro />}/>

            <Route path='/visualizar' element={<VisualizarLockouts />}/>

            <Route path='/usuarios' element={<Usuarios />}/>
            <Route path='/usuarios/:uid' element={<CadastroUsuario />}/>
            


            <Route path='/nao-autorizado' element={<NaoAutorizado />}/>
          </Routes>
        </ChakraProvider>
      </Router>

    </>
  )
}

export default App
