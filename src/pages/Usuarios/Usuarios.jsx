    import React, { useState, useEffect } from 'react'
    import { NavBar } from '../../components/NavBar/NavBar'
    import { Api } from '../../services/api';
    import CardUsuarios from '../../components/cardUsuarios/CardUsuarios';
    import { Loading } from '../../components/Loading/Loading';
    import { Text, Box, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
    import { FaSearch } from 'react-icons/fa';
    import "./usuarios.css"

    const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([])
    const [loading, setLoading] = useState(true)
    const [pesquisa, setPesquisa] = useState("") // estado para o texto digitado

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

      const semCadastro = usuarios.filter(u => !u.id_colaborador)

      const usuariosFiltrados = usuarios.filter(usuario => {
        const termo = pesquisa.toLowerCase()
        return (
        usuario.nome?.toLowerCase().includes(termo) ||
        usuario.id_colaborador?.toLowerCase().includes(termo) ||
        usuario.UID?.toLowerCase().includes(termo)
        )
      })


    
        return (
        <>
            <NavBar nomePagina='USUÁRIOS'/>
            <div className="content usuarios">
            {
                loading ? 

                <Loading />

                :
                <>
                    {/* Campo de pesquisa */}
                    <InputGroup mb={4} maxW="20rem">
                    <InputLeftElement pointerEvents="none">
                        <FaSearch color="gray.400" />
                    </InputLeftElement>
                    <Input
                        type="text"
                        placeholder="Pesquisar usuário..."
                        value={pesquisa}
                        onChange={(e) => setPesquisa(e.target.value)}
                    />
                    </InputGroup>

                {
                semCadastro.length > 0 ? (
                    <Text fontSize={"20px"} color={"red"} mb={4}>Usuários sem Cadastro: </Text>

                ):
                ""}    
                    
                {   usuariosFiltrados.map((usuario, index) => (
                    !usuario.id_colaborador ?
                    <CardUsuarios key={index} usuario={usuario} />
                    :
                    ""
                ))
                }

                <Text fontSize={"20px"} color={"red"} mb={4}>Setor: Manut T</Text>
                {   usuariosFiltrados.map((usuario, index) => (
                    usuario.id_colaborador ?
                    <CardUsuarios key={index} usuario={usuario} />
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