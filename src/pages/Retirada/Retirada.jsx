import React, { useEffect } from 'react'
import {NavBar} from '../../components/NavBar/NavBar'
import { useState } from 'react'
import { FormRetirada } from '../../components/formRetirada/formRetirada'
import { RevisaoRetirada } from '../RevisaoRetirada/RevisaoRetirada'
import "./retirada.css"
import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { Api } from '../../services/api'

const Retirada = () => {
  const navigate = useNavigate()

  const [usuario, setUsuario] = useState({})
  const [lockouts, setLockouts] = useState([])


  const irParaRevisao = (values) => {
    navigate('/retirada/revisao', { state: { values, usuario } })
  }

  useEffect(() => {
    const handleGetUsuario = async () => {
            try {
                const fetch = await Api.get('/status_abertura/status')
                setUsuario(fetch.data)

            } catch (e) {
              console.log(e)
            }
        }
      
    const handleGetLockouts = async() => {
      try {
          const fetch = await Api.get('/status_abertura')
          setLockouts(fetch.data)

      } catch (e) {
        console.log(e)
      }

    }
      handleGetUsuario()
      handleGetLockouts()
    
  }, [])

  // useEffect(() => {
  //   if (usuario && Object.keys(usuario).length === 0) {
  //     navigate('/nao-autorizado')
  //   }
  // }, [usuario])


  console.log(lockouts)




  return (
    <>
      <NavBar/>
      <div className="content">
        <p>Olá <span className='colaborador'>{usuario.nome} ({usuario.id_colaborador})</span> Seja bem-vindo ao sistema de retirada de lockouts!</p>
        <FormRetirada aoRevisar={ irParaRevisao } lockouts={lockouts}/>
      </div>
    </>
  )
}

export {Retirada}
