import { Box, Text } from '@chakra-ui/react'
import { formataData } from '../../services/formataData'
import { useNavigate } from 'react-router-dom'

const CardUsuarios = ({usuario = {}}) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/usuarios/${usuario.UID}`)
  }

    return (
    <>
        {
            !usuario.id_colaborador ?  
        <Box
        border="2px solid #FF0000" // azul
        borderRadius="md"
        p={3}
        w="80%"
        mb={4}
          cursor="pointer"
          transition="all 0.2s"
          _hover={{
            boxShadow: 'lg',
            transform: 'scale(1.02)',
            backgroundColor: 'rgba(68, 255, 0, 0.23)',
          }}
          onClick={handleClick}
        >
        <Text>
            UID:{" "}
            <Text as="span" color="red.500" fontWeight="bold">
            {usuario.UID}
            </Text>
        </Text>
        <Text>
            Data de cadastro:{" "}
            <Text as="span" color="red.500" fontWeight="bold">
            {formataData(usuario.hora_cadastro)}
            </Text>
        </Text>
        </Box>

        :
        //caso haja usuario cadastrado.
        <Box
        border="2px solid #000" 
        borderRadius="md"
        p={3}
        w="80%"
        mb={4}
        cursor="pointer"
        transition="all 0.2s"
        _hover={{
          boxShadow: 'lg',
          transform: 'scale(1.02)',
          backgroundColor: 'rgba(68, 255, 0, 0.23)',
        }}

        onClick={handleClick}
        >
        <Text>
            Nome:{" "}
            <Text as="span" color="red.500" fontWeight="bold">
            {usuario.nome}
            </Text>
        </Text>
        <Text>
            ID Colaborador:{" "}
            <Text as="span" color="red.500" fontWeight="bold">
            {usuario.id_colaborador}
            </Text>
        </Text>
        </Box>

        }
    </>
  )
}

export default CardUsuarios