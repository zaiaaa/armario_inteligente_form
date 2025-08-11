import React from 'react'
import { NavBar } from '../../components/NavBar/NavBar'
import { FormLockouts } from '../../components/formLockouts/FormLockouts'

const CadastroLockout = () => {
  return (
    <>
        <NavBar nomePagina='CADASTRO'/>
        <div className="content">
            <FormLockouts />
        </div>
        
    </>
  )
}

export {CadastroLockout}