import React, { useEffect, useState } from 'react'
import { NavBar } from "../../components/NavBar/NavBar"
import {
  Card, CardBody, Image, Stack, InputLeftElement,
  Heading, Text, Divider, Button, Input, InputGroup
} from '@chakra-ui/react'
import lockoutDisponivel from "../../assets/lockout_disponivel.png"
import lockoutIndisponivel from "../../assets/lockout_indisponivel.png"
import { Api } from '../../services/api'
import { Loading } from '../../components/Loading/Loading'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { formataData } from '../../services/formataData'
import { useNavigate } from 'react-router-dom'
import { FaArrowRight, FaSearch } from 'react-icons/fa'
import "./visualizarLockouts.css"
import { Footer } from '../../components/Footer/Footer'
import { FaArrowLeft } from 'react-icons/fa'
import { Icon } from '@chakra-ui/react'


dayjs.extend(utc)
dayjs.extend(timezone)

const VisualizarLockouts = () => {
  const [lockouts, setLockouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [pesquisa, setPesquisa] = useState("")
  const [paginaAtual, setPaginaAtual] = useState(1)
  const itensPorPagina = window.innerWidth < 700 ? 5 : 12
  const navigate = useNavigate()

  useEffect(() => {
    const handleGetLockouts = async () => {
      try {
        const fetch = await Api.get('/status_abertura')
        setLockouts(fetch.data)
        setLoading(false)
      } catch (e) {
        console.log(e)
      }
    }
    handleGetLockouts()
  }, [])

  // Filtro
  const lockoutsFiltrados = lockouts.filter(lockout => {
    const termo = pesquisa.toLowerCase()
    return lockout.tag?.toLowerCase().includes(termo)
  })

  // 📄 Paginação
  const indexInicial = (paginaAtual - 1) * itensPorPagina
  const indexFinal = indexInicial + itensPorPagina
  const lockoutsPaginados = lockoutsFiltrados.slice(indexInicial, indexFinal)
  const totalPaginas = Math.ceil(lockoutsFiltrados.length / itensPorPagina)

  // Alterar página
  const mudarPagina = (novaPagina) => {
    if (novaPagina >= 1 && novaPagina <= totalPaginas) {
      setPaginaAtual(novaPagina)
      window.scrollTo({ top: 0, behavior: 'smooth' }) // sobe pro topo
    }
  }

  return (
    <>
      <NavBar nomePagina='VISUALIZAÇÃO' />

      <div className="content lockouts">
        {loading ? (
          <Loading />
        ) : (
          <>
            {/* Campo de pesquisa */}
            <InputGroup mb={4} w={{ base: "80%", sm: "20rem", md: "40rem", lg: "60rem" }}>
              <InputLeftElement pointerEvents="none">
                <FaSearch color="gray.400" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Pesquisar lockout..."
                value={pesquisa}
                onChange={(e) => {
                  setPesquisa(e.target.value)
                  setPaginaAtual(1) // reseta a página quando pesquisa
                }}
              />
            </InputGroup>

            {/* Cards */}
            <div className='lockoutsArea'>
              {lockoutsPaginados.map((lockout, index) => (
                <Card
                  key={index}
                  maxW='sm'
                  ml={4}
                  mr={4}
                  mb={4}
                  boxShadow="lg"
                  border="1px solid #E2E8F0"
                  _hover={{
                    boxShadow: "xl",
                    transform: "scale(1.02)",
                    transition: "0.2s ease-in-out"
                  }}
                  onClick={() => navigate(`/lockouts/editar/${lockout.tag}`)}
                >
                  <CardBody>
                    <Image
                      src={lockout.status === "devolvido" ? lockoutDisponivel : lockoutIndisponivel}
                      alt={lockout.status === "devolvido" ? "Lockout Disponível" : "Lockout Indisponível"}
                      borderRadius='lg'
                    />
                    <Stack mt='6' spacing='3'>
                      <Heading size='lg' textAlign={"center"}>TAG {lockout.tag}</Heading>
                      <Divider borderColor={"#000"} />
                      <Text color={lockout.status === "devolvido" ? "#61D200" : "#FF0000"}>
                        Lockout {lockout.status === "devolvido" ? "DISPONÍVEL" : "INDISPONÍVEL"}
                      </Text>
                      {lockout.status === "retirado" && (
                        <>
                          <Text color="#FF0000">Local: {lockout.local}</Text>
                          <Divider borderColor="#000" />
                          <Text color="#FF0000">Data: {formataData(lockout.hora_retirada)}</Text>
                          <Divider borderColor="#000" />
                          <Text color="#FF0000">Retirado por: {lockout.nome}</Text>
                        </>
                      )}
                    </Stack>
                  </CardBody>
                </Card>
              ))}
            </div>

            {/* Paginação */}
            {totalPaginas > 1 && (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", margin: "1rem 0" }}>
                <Button
                  colorScheme="red"
                  isDisabled={paginaAtual === 1}
                  onClick={() => mudarPagina(paginaAtual - 1)}
                >
                  <Icon as={FaArrowLeft} />
                </Button>

                <Text>Página {paginaAtual} de {totalPaginas}</Text>

                <Button
                  colorScheme="red"
                  variant={"solid"}
                  isDisabled={paginaAtual === totalPaginas}
                  onClick={() => mudarPagina(paginaAtual + 1)}
                >
                  <Icon as={FaArrowRight} />
                </Button>
              </div>
            )}

            {/* Botão no final */}
            <div className="botao__div">
              <Button
                m={{ base: 6, xl: 0 }}
                mb={{ xl: 4 }}
                className='botao'
                colorScheme="green"
                onClick={() => navigate("/lockouts/cadastro")}
              >
                Novo Lockout
              </Button>
            </div>
          </>
        )}
      </div>

      {!loading && <Footer />}
    </>
  )
}

export { VisualizarLockouts }
