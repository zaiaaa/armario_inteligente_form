import React from 'react'
import "./naoAutorizado.css"
import { NavBar } from '../../components/NavBar/NavBar'
import cracha from "../../assets/cracha.png"

const NaoAutorizado = () => {
  return (
    <>
        <NavBar nomePagina='SISTEMA'/>
        <div className='content'>
            <img src={cracha} alt="" />
            <p style={{marginTop: "40px", fontSize: "25px"}}>Você precisa escanear o crachá no leitor para acessar o sistema!</p>
        </div>
    </>
)
}

export {NaoAutorizado}