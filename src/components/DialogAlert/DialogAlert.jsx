import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'

import { useDisclosure, Button, useToast } from '@chakra-ui/react'

import { Api } from '../../services/api'

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const DialogAlert = ({lockoutSelecionado, uid}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const toast = useToast()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  //console.log(lockoutSelecionado)
    const liberacao = async () => {

        try{
            setLoading(true)
            await Api.post("/status_abertura/devolucao", {
            chave: "s",
            //chave: "s" significa q a manut vai retirar apenas a CHAVE do armário, para pegar o lockout.
            tag: lockoutSelecionado,
            UID: uid
        })
        navigate("/devolucao/sucesso")
        }catch(err){
            setLoading(false)
            toast({
                title: "Erro!",
                description: {"message": err},
                status: "error",
                duration: 3000,
                isClosable: true
            });
        }

    }


    return (
    <>
      <Button marginLeft={"20px"} colorScheme='red' onClick={onOpen} isDisabled={!lockoutSelecionado}>
        Estou sem chaves!
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent maxW={{ base: "90%", sm: "400px", md: "500px" }}>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Estou sem chaves!
            </AlertDialogHeader>

            <AlertDialogBody>
                {
                    `Confirmando essa caixa, o armário se abrirá apenas para pegar a chave do lockout ${lockoutSelecionado}`

                }
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button isLoading={loading} colorScheme='red' onClick={liberacao} ml={3}>
                Abrir
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>

    )
}

export {DialogAlert}