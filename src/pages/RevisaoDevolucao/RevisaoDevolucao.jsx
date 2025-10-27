import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Button, Text, Flex, Avatar } from '@chakra-ui/react'
import { useState } from 'react'
import { NavBar } from '../../components/NavBar/NavBar'
import { Api } from '../../services/api'

function RevisaoDevolucao() {
  const location = useLocation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false) // ← loading state

  const values = location.state?.values || []
  const usuario = location.state?.usuario || {}

  console.log(values)
  console.log(usuario)


  const enviarTodos = async () => {
    try {
    setLoading(true) // ← start loading
    const requisicoes = values.map((lockout) =>
      Api.post("/status_abertura/devolucao", {
        UID: usuario.UID,
        tag: lockout.tag,
        status: "devolvido",
        local: "",  
        chave: "n"
        //chave: "n" significa q a manut vai DEVOLVER o LOCKOUT e a CHAVE.
      })
    );

    await Promise.all(requisicoes);

    console.log('Enviados com sucesso');
    navigate("/devolucao/sucesso"); // ou qualquer redirecionamento desejado
  } catch (error) {
    navigate("/devolucao/erro", {state: {error}}); // ou qualquer redirecionamento desejado

    console.error("Erro ao enviar lockouts:", error.message);
  } finally {
      setLoading(false) // ← stop loading (optional if navigating away)
    }

    
    // console.log('Enviando lockouts:', values)
    // console.log('Por:', usuario.UID)
    // axios.post(...) etc.
  }

  return (
    <>
      <NavBar nomePagina='DEVOLUÇÃO'/>
      <div className='content'>
        <p>Olá <span className='colaborador'>{usuario.nome} ({usuario.id_colaborador})</span> Seja bem-vindo ao sistema de devolução de lockouts!</p>

        <p style={{ marginTop: "30px" }}>
          <span className='colaborador'>Revise </span> e <span className='colaborador'>confirme</span> com <span className='colaborador'>atenção</span> os lockouts que serão retirados.
        </p>

        {
            values.map((item, i) => (
                <Box key={i} p={4} border="1px solid gray" borderRadius="md" mt={4} mr={4} ml={4} textAlign={"left"}>
                        <Text textAlign={'left'} fontSize={"21px"}><strong>Tag:</strong> <span style={{ color: 'red' }}>{item?.tag}</span></Text>
                        <Text textAlign={'left'}fontSize={"21px"} mt={2}><strong>Local:</strong> <span style={{ color: 'red' }}>Devolvido</span></Text>
                </Box>

            ))
        }
        

        <Text fontSize="15px" mt={6} textAlign="center" color="red.500">
          Assim que enviado, a trava será <strong>aberta</strong> em até <strong>5 segundos</strong>.
        </Text>

        <Flex justify="space-between" mt={6} ml={50} mr={50}>
          <Button colorScheme="yellow" onClick={() => navigate(-1)}>Voltar</Button>
          <Button isLoading={loading} colorScheme="green" onClick={enviarTodos}>Enviar</Button>
        </Flex>
      </div>
    </>
  )
}

export { RevisaoDevolucao }
