// PrivateRoute.js
//Possui o objetivo de privar rotas de alteração com uma senha.
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Acesso } from '../pages/Acesso/Acesso';

const PrivateRoute = ({children}) => {
  //const location = useLocation()

  const senha = localStorage.getItem('senha');
    
  return senha === "ManutT05" ? children : <Acesso />

};

export {PrivateRoute};