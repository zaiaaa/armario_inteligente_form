import React from 'react'
import {NavBar} from '../../components/NavBar/NavBar'
import { useState } from 'react'
import { FormRetirada } from '../../components/formRetirada/formRetirada'
import { RevisaoRetirada } from '../RevisaoRetirada/RevisaoRetirada'
import "./retirada.css"
import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const Retirada = () => {
    const navigate = useNavigate()

  const irParaRevisao = (values) => {
    navigate('/retirada/revisao', { state: { values } })
  }




  return (
    <>
      <NavBar/>
      <div className="content">
        <p>Olá <span className='colaborador'>João Pedro!</span> Seja bem-vindo ao sistema de retirada de lockouts!</p>
        <FormRetirada aoRevisar={ irParaRevisao }/>
      </div>
    </>
  )
}

export {Retirada}
