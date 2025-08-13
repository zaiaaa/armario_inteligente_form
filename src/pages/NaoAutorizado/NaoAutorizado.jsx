import React, { useEffect } from 'react'
import "./naoAutorizado.css"
import { NavBar } from '../../components/NavBar/NavBar'
import cracha from "../../assets/cracha.png"
import { Api } from '../../services/api'
import { useNavigate } from 'react-router-dom'

const NaoAutorizado = () => {
    const navigate = useNavigate()
      useEffect(() => {
    
        const checkAbertura = async () => {
            try {
                const response = await Api.get("/status_abertura/status");
                console.log("Response data:", response.data);

                // Se tiver registro, redireciona:
                navigate("/retirada"); // A página que deseja redirecionar
                
                // Senão — mantém aqui
            } catch (error) {
                console.error("Erro ao verificar status de abertura:", error);
            }
        };

    checkAbertura();
  }, [navigate]);

  return (
    <>
        <NavBar nomePagina='SISTEMA'/>
        <div className='content img'>
            <img style={{width: "600px"}} src={cracha} alt="" />
            <p style={{marginTop: "40px", fontSize: "25px"}}>Você precisa escanear o crachá no leitor para acessar o sistema!</p>
            <p style={{marginTop: "40px", fontSize: "25px"}}>Caso você já tenha sido liberado, <span style={{color: "#FF0000"}}>Recarregue a página!</span></p>
        </div>
    </>
)
}

export {NaoAutorizado}