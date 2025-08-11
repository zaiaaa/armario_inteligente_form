import React from 'react'
import { Field, Form, Formik } from 'formik'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Select,
  Box
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import './formCadastraUsuario.css'
import { Api } from '../../services/api'

const FormCadastraUsuario = ({ uidColaborador }) => {
  const navigate = useNavigate()

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
        nome: `${values.first_name} ${values.last_name}`,
        id_colaborador: values.id_colaborador,
        setor: values.setor
      })
      console.log('Usuário cadastrado:', values)
      navigate("/usuarios")
    } catch (error) {
      console.log(error)
    }
  
  }

  return (
    <Formik
      initialValues={{
        uid: uidColaborador || '',
        first_name: '',
        id_colaborador: '',
        last_name: '',
        setor: ''
      }}
      onSubmit={async (values, actions) => {
        await handleUser(values)
        actions.setSubmitting(false)
      }}
    >
      {(props) => (
        <Form>
          <Box border="1px solid #ccc" borderRadius={6} p={4} m={2.5}>
            <FormLabel fontWeight="bold">Cadastro de Usuário</FormLabel>

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
        </Form>
      )}
    </Formik>
  )
}

export { FormCadastraUsuario }
