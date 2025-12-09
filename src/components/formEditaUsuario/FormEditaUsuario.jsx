import { Field, Form, Formik } from 'formik'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Select,
  Box,
  useToast
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { Api } from '../../services/api'
import { toTitleCase } from '../../services/toTitleCase'
import { useEffect, useState } from 'react'

const FormEditaUsuario = ({ uidColaborador }) => {
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState([])
    const [loading, setLoading] = useState(false)
    const toast = useToast();

    useEffect(() => {
        const handleGetUser = async () => {
          const currentUser = await Api.get(`/usuarios/${uidColaborador}`)
          if(currentUser.data.length > 0){
            setCurrentUser(currentUser.data[0])
          }
        }
        handleGetUser()
      }, [])
    
    const excluirUsuario = async () => {
        try{
            const exclusao = await Api.delete(`/usuarios/${uidColaborador}`)
            if(exclusao.status == 200){
                toast({
                    title: "Sucesso!",
                    description: "Usuário excluído com sucesso.",
                    status: "success",
                    duration: 3000,
                    isClosable: true
                });
                navigate("/usuarios")
            }

        }catch(err){
            console.log("erro -> ", err.message)
        }


    }

  function validarCampo(value) {
    let error
    if (!value) {
      error = 'Campo obrigatório!'
    }
    return error
  }

  const handleUser = async (values) => {
    
    try {
      await Api.put(`/usuarios/${uidColaborador}`, {
        nome: `${toTitleCase(values.first_name)} ${toTitleCase(values.last_name)}`,
        id_colaborador: values.id_colaborador,
        setor: values.setor
      })
      toast({
        title: "Sucesso!",
        description: "Usuário cadastrado com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true
      });

      console.log('Usuário cadastrado:', values)
      navigate("/usuarios")
    } catch (error) {
      toast({
        title: "Erro ao cadastrar",
        description: error.response?.data?.message || "Tente novamente.",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    }
  
  }

  return (
    <Formik
      initialValues={{
        uid: uidColaborador || '',
        first_name: currentUser?.nome?.split()[0] || '',
        id_colaborador: currentUser?.id_colaborador || '',
        last_name: currentUser?.nome?.split()[1] || '',
        setor: "Manut T" | ''
      }}
      onSubmit={async (values, actions) => {
        await handleUser(values)
        actions.setSubmitting(false)
      }}
    >
      {(props) => (
        <Form>
          <Box border="1px solid #ccc" borderRadius={6} p={4} m={2.5}>
            <FormLabel fontWeight="bold">Edição de Usuário</FormLabel>

            {/* UID */}
            <Field name="uid" validate={validarCampo}>
              {({ field, form }) => (
                <FormControl
                  mb={3}
                  isInvalid={form.errors.uid && form.touched.uid}
                >
                  <FormLabel>UID</FormLabel>
                  <Input {...field} isDisabled />
                  <FormErrorMessage>{form.errors.uid}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            {/* Primeiro Nome */}
            <Field name="first_name" validate={validarCampo}>
              {({ field, form }) => (
                <FormControl
                  mb={3}
                  isInvalid={
                    form.errors.first_name && form.touched.first_name
                  }
                >
                  <FormLabel>Primeiro Nome</FormLabel>
                  <Input {...field} placeholder="Digite o primeiro nome" />
                  <FormErrorMessage>
                    {form.errors.first_name}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>

                        {/* Último Nome */}
            <Field name="last_name" validate={validarCampo}>
              {({ field, form }) => (
                <FormControl
                  mb={3}
                  isInvalid={
                    form.errors.last_name && form.touched.last_name
                  }
                >
                  <FormLabel>Último Nome</FormLabel>
                  <Input {...field} placeholder="Digite o último nome" />
                  <FormErrorMessage>
                    {form.errors.last_name}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>


            {/* ID Colaborador */}
            <Field name="id_colaborador" validate={validarCampo}>
              {({ field, form }) => (
                <FormControl
                  mb={3}
                  isInvalid={
                    form.errors.id_colaborador &&
                    form.touched.id_colaborador
                  }
                >
                  <FormLabel>ID do Colaborador</FormLabel>
                  <Input {...field} placeholder="Digite o ID do colaborador" />
                  <FormErrorMessage>
                    {form.errors.id_colaborador}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>

            {/* Select Setor */}
            <Field name="setor" validate={validarCampo}>
              {({ field, form }) => (
                <FormControl
                  mb={3}
                  isInvalid={form.errors.setor && form.touched.setor}
                >
                  <FormLabel>Setor</FormLabel>
                  <Select {...field} placeholder="Selecione o setor">
                    <option value="Manut T">Manut T</option>
                  </Select>
                  <FormErrorMessage>{form.errors.setor}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </Box>

          <Button
            mt={4}
            ml={5}
            mb={10}
            colorScheme="green"
            isLoading={props.isSubmitting}
            type="submit"
          >
            Enviar
          </Button>

          <Button
            mt={4}
            ml={5}
            mb={10}
            colorScheme="red"
            isLoading={loading}
            type="button"
            onClick={excluirUsuario}
          >
            Excluir usuário
          </Button>

        </Form>
      )}
    </Formik>
  )
}

export { FormEditaUsuario }
