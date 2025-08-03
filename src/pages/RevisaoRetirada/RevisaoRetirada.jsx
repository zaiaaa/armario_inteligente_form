import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Button, Text, Flex, Avatar } from '@chakra-ui/react'
import { useState } from 'react'
import { NavBar } from '../../components/NavBar/NavBar'

function RevisaoRetirada() {
  const location = useLocation()
  const navigate = useNavigate()

  const values = location.state?.values

  console.log(values)

  const enviarTodos = () => {
    console.log('Enviando lockouts:', values)
    // axios.post(...) etc.
  }

  return (
    <>
      <NavBar />
      <div className='content'>
        <p>Olá <span className='colaborador'>João Pedro!</span> Seja bem-vindo ao sistema de retirada de lockouts!</p>

        <p style={{ marginTop: "30px" }}>
          <span className='colaborador'>Revise </span> e <span className='colaborador'>confirme</span> com <span className='colaborador'>atenção</span> os lockouts que serão retirados.
        </p>

        {
            values.map((item, i) => (
                <Box key={i} p={4} border="1px solid gray" borderRadius="md" mt={4} mr={4} ml={4} textAlign={"left"}>
                        <Text textAlign={'left'} fontSize={"21px"}><strong>Tag:</strong> <span style={{ color: 'red' }}>{item?.tag}</span></Text>
                        <Text textAlign={'left'}fontSize={"21px"} mt={2}><strong>Local:</strong> <span style={{ color: 'red' }}>{item?.local}</span></Text>
                </Box>

            ))
        }
        

        <Text fontSize="15px" mt={6} textAlign="center" color="red.500">
          Assim que enviado, a trava será <strong>aberta</strong> em até <strong>5 segundos</strong>.
        </Text>

        <Flex justify="space-between" mt={6} ml={50} mr={50}>
          <Button colorScheme="yellow" onClick={() => navigate(-1)}>Voltar</Button>
          <Button colorScheme="green" onClick={enviarTodos}>Enviar</Button>
        </Flex>
      </div>
    </>
  )
}

export { RevisaoRetirada }
