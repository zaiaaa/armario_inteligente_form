import React from 'react'
import "./defaultTitle.css"


const DefaultTitle = ({usuario = {}, type}) => {
  return (
    <p>Olá <span className='colaborador'>{usuario.nome} ({usuario.id_colaborador})</span> Seja bem-vindo ao sistema de {type} de lockouts!</p>
  )
}

export {DefaultTitle}