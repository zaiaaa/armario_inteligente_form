import React, { useEffect } from 'react'
import "./sucesso.css"
import { NavBar } from '../../components/NavBar/NavBar'
import success from "../../assets/success.png"

const Sucesso = () => {

  return (
    <>
        <NavBar nomePagina='SISTEMA'/>
        <div className='content green'>
            <img src={success} width="400px" style={{marginTop: "30px"}} alt="" />
            <p style={{color: "white", fontSize: "30px"}}>Dados registrados com sucesso e trava aberta!</p>
        </div>
    </>
)
}

export {Sucesso}