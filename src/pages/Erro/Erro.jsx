import React from 'react'
import "./erro.css"
import { NavBar } from '../../components/NavBar/NavBar'
import erro from "../../assets/erro.png"

const Erro = () => {
  return (
    <>
        <NavBar nomePagina='SISTEMA'/>
        <div className='content red'>
            <img src={erro} width="320px" style={{marginTop: "30px"}} alt="" />
            <p style={{color: "white", fontSize: "30px"}}>Dados não registrados!!</p>

            <p style={{color: "white", fontSize: "30px"}}>Erro: {}</p>
        </div>
    </>
)
}

export {Erro}