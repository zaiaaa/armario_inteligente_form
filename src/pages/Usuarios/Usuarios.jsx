    import React, { useState, useEffect } from 'react'
    import { NavBar } from '../../components/NavBar/NavBar'
    import { Api } from '../../services/api';
    import CardUsuarios from '../../components/cardUsuarios/CardUsuarios';
    import { Loading } from '../../components/Loading/Loading';
    import { Text } from '@chakra-ui/react';
    import "./usuarios.css"

    const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([])
        const [loading, setLoading] = useState(true)
    useEffect(() => {
        const getUsuarios = async () => {
            try {
                const fetch = await Api.get("/usuarios")
                setUsuarios(fetch.data)
            } catch (error) {
                console.log(error)
            }
            setLoading(false)
        }

        getUsuarios()
    }, []);

    
        return (
        <>
            <NavBar nomePagina='USUÁRIOS'/>
            <div className="content usuarios">
            {
                loading ? 

                <Loading />

                :
                <>
                    <Text fontSize={"20px"} color={"red"} mb={4}>Usuários sem Cadastro: </Text>
                    
                {    usuarios.map((usuario, index) => (         
                        !usuario.id_colaborador ?       
                        <CardUsuarios key={index} usuario={usuario}/>
                        :
                        ""
                    ))
                }

                <Text fontSize={"20px"} color={"red"} mb={4}>Setor: Manut T</Text>
                {    usuarios.map((usuario, index) => (         
                        usuario.id_colaborador ?       
                        <CardUsuarios key={index} usuario={usuario}/>
                        :
                        ""
                    ))
                }
                </>
                
            }
            
            </div>
        </>
    )
    }

    export default Usuarios