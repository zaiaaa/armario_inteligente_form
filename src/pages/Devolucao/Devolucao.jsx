import React, { useEffect } from 'react'
import {NavBar} from '../../components/NavBar/NavBar'
import { useState } from 'react'
import { FormDevolucao } from '../../components/formDevolucao/FormDevolucao'
import { RevisaoRetirada } from '../RevisaoRetirada/RevisaoRetirada'
import "./devolucao.css"
import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { Api } from '../../services/api'
import { Loading } from '../../components/Loading/Loading'

const Devolucao = () => {
  const navigate = useNavigate()

  const [usuario, setUsuario] = useState({})
  const [lockouts, setLockouts] = useState([])
  const [loading, setLoading] = useState(true)

  const irParaRevisao = (values) => {
    navigate('/devolucao/revisao', { state: { values, usuario } })
  }

  useEffect(() => {
    const handleGetUsuario = async () => {
      try {
          const fetch = await Api.get('/status_abertura/status')
          if(fetch.data.acao == "retirada"){
            navigate("/retirada")
          }else{
            setUsuario(fetch.data)
          }

      } catch (e) {
        console.log(e)
      }
    }
      
    const handleGetLockouts = async() => {
      try {
          const fetch = await Api.get('/status_abertura')
          setLockouts(fetch.data)
          setLoading(false)

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
      <NavBar nomePagina='DEVOLUÇÃO'/>
      <div className="content">
        {
          loading === true ? (
            <Loading />
          )
          :(
          <>
            <p>Olá <span className='colaborador'>{usuario.nome} ({usuario.id_colaborador})</span> Seja bem-vindo ao sistema de devolução de lockouts!</p>
            <FormDevolucao aoRevisar={ irParaRevisao } lockouts={lockouts}/>
          </>            
          )
        }
      </div>
    </>
  )
}

export {Devolucao}
