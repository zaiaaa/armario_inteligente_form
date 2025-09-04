import React, { useEffect, useState } from 'react'
import { NavBar } from '../../components/NavBar/NavBar'
import { useNavigate, useParams } from 'react-router-dom'
import {FormRetirada} from "../../components/formRetirada/FormRetirada"
import { Box, Text, useToast } from '@chakra-ui/react'
import { Api } from '../../services/api'
import { Button } from '@chakra-ui/react'

const EditarLockout = () => {
  const [lockout, setLockouts] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const {tag} = useParams()
  console.log(tag)

  const toast = useToast()

  useEffect(() => {
      const handleGetLockout = async () => {
      try {
        const fetch = await Api.get(`/status_abertura/${tag}`)
        setLockouts(fetch.data)
      } catch (error) {
        console.log(error)
        setLockouts({"message": error})
      }}

      handleGetLockout()
  }, [])
        console.log(lockout)

  const devolverLockout = async () => {
    setLoading(true)
      try {
        await Api.post("/status_abertura/devolucao", {
          UID: "4328F82C",
          tag: tag,
        })

      toast({
        title: "Sucesso!",
        description: "Devolução cadastrada com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true
      });

      } catch (error) {      
        toast({
          title: "Erro na devolução!",
          description: error.response?.data?.message,
          status: "error",
          duration: 3000,
          isClosable: true
        });
      } finally{
        setLoading(true)
        navigate("/lockouts")
      }
  }

  const editarLockout = async (values) => {
      console.log(values)
      try {
        await Api.post("/status_abertura/retirada", {
          UID: "4328F82C",
          tag: values[0].tag,
          status: "retirado",
          local: values[0].local,
        })

        toast({
          title: "Sucesso!",
          description: "Retirada cadastrada com sucesso.",
          status: "success",
          duration: 3000,
          isClosable: true
        });
                
        navigate("/lockouts")
      } catch (error) {
        toast({
          title: "Erro na retirada!",
          description: error.response?.data?.message,
          status: "error",
          duration: 3000,
          isClosable: true
        });      }
  }
  return (
    <>
        <NavBar nomePagina='SISTEMA'/>
        <div className='content'>
          {
            lockout?.status == "retirado" ? 
              <Text mb={"-80px"}>lockout <span style={{color: "red"}}>{lockout?.status}</span> por <span style={{color: "red"}}>{lockout?.nome}</span></Text>
              :
              <Text mb={"-80px"}>lockout <span style={{color: "green"}}>{lockout?.status}</span> </Text>
          }
          
          <FormRetirada edicao={true} tagEdicao={tag} aoRevisar={ editarLockout } />

          <Box display={"flex"} flexDirection={"row"} gap={4} mt={"-24px"} width={"100%"}>
            <Button isLoading={loading} ml={5} colorScheme='yellow' onClick={() => navigate("/lockouts")}>Voltar</Button>
            <Button isLoading={loading} ml={5} colorScheme='blue' onClick={devolverLockout}>Devolver Lockout!</Button>
          

          </Box>
        </div>
    </>
  )
}

export {EditarLockout}