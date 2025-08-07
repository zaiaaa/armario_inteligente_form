import React from 'react'
import "./navbar.css"
import { Heading } from '@chakra-ui/react'
import toyota_logo from "../../assets/toyota_logo_nav.png"

const NavBar = ({nomePagina = ""}) => {
  return (
    <div className="navbar">
      <img src={toyota_logo} alt="" width={'100px'} />
      <Heading as="h3" fontWeight="bold" fontSize="30px">
        {nomePagina} DE LOCKOUTS
      </Heading>

    </div>
  )
}

export {NavBar}