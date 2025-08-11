import React, { useEffect, useState } from 'react'
import {NavBar} from "../../components/NavBar/NavBar"
import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, Button, ButtonGroup } from '@chakra-ui/react'
import lockoutDisponivel from "../../assets/lockout_disponivel.png"
import lockoutIndisponivel from "../../assets/lockout_indisponivel.png"
import { Api } from '../../services/api'
import { Loading } from '../../components/Loading/Loading'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { formataData } from '../../services/formataData'
import { useNavigate } from 'react-router-dom'
dayjs.extend(utc)
dayjs.extend(timezone)



const VisualizarLockouts = () => {
  const [lockouts, setLockouts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()


  useEffect(() => {
      const handleGetLockouts = async() => {
      try {
          const fetch = await Api.get('/status_abertura')
          setLockouts(fetch.data)
          setLoading(false)
        }catch (e) {
        console.log(e)
      }

    }
    handleGetLockouts()



  }, [])
  
  return (
    <>
        <NavBar nomePagina='VISUALIZAÇÃO'/>


        
        <div className="content">
        {
            loading == true ? (
                <Loading />

            )

                : 
            (
                <>
                    {lockouts.map((lockout, index) => (
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
                    >
                    <CardBody>
                    <Image
                        src={lockout.status === "devolvido" ? lockoutDisponivel : lockoutIndisponivel}
                        alt={lockout.status === "devolvido" ? "lockout Disponível" : "lockout Indisponivel"}
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

            {/* Botão no final */}
            <Button
                m={6}
                colorScheme="green"
                onClick={() => navigate("/lockouts/cadastro")}
            >
                Novo Lockout
            </Button>
        </>
            )

        
        }    

        </div>
    </>
  )
}

export {VisualizarLockouts}