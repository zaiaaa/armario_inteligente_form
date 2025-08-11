import React from 'react'
import { useParams } from 'react-router-dom'
import { NavBar } from '../../components/NavBar/NavBar'
import { DefaultTitle } from '../../components/DefaultTitle/DefaultTitle'
import { FormCadastraUsuario } from '../../components/formCadastraUsuario/FormCadastraUsuario'

const CadastroUsuario = () => {
    const {uid} = useParams()
  return (
    <>
    <NavBar nomePagina='USUÁRIOS'/>
    <div className="content">
        <FormCadastraUsuario uidColaborador={uid} />
    </div>
    </>
  )
}

export {CadastroUsuario}