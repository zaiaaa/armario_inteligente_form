import React from 'react'
import "./navbar.css"
import { Heading } from '@chakra-ui/react'

const NavBar = ({nomePagina = ""}) => {
  return (
    <div className="navbar">
      <img src="../src/assets/toyota_logo_nav.png" alt="" width={'100px'} />
      <Heading as="h3" fontWeight="bold" fontSize="30px">
        {nomePagina} DE LOCKOUTS
      </Heading>

    </div>
  )
}

export {NavBar}