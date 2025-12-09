import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { NavBar } from '../../components/NavBar/NavBar'
import { DefaultTitle } from '../../components/DefaultTitle/DefaultTitle'
import { FormCadastraUsuario } from '../../components/formCadastraUsuario/FormCadastraUsuario'
import { Api } from '../../services/api'
import { FormEditaUsuario } from '../../components/formEditaUsuario/FormEditaUsuario'

const CadastroUsuario = () => {
  const {uid} = useParams()
  const [userExiste, setUserExiste] = useState(false)
  useEffect(() => {
    const handleGetUser = async () => {
      const userExiste = await Api.get(`/usuarios/${uid}`)
      if(userExiste.length > 0){
        setUserExiste(true)
      }
    }
    handleGetUser()
  }, [])
  return (
    <>
    <NavBar nomePagina='USUÁRIOS'/>
    <div className="content">
        {
          !userExiste ?
          <FormCadastraUsuario uidColaborador={uid} />
          :
          <FormEditaUsuario uidColaborador={uid} />
        }

    </div>
    </>
  )
}

export {CadastroUsuario}