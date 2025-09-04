import React from 'react'
import { Field, Form, Formik } from 'formik'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Select,
  Box,
  useToast,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react'
import { NavBar } from '../../components/NavBar/NavBar'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { useNavigate, useParams } from 'react-router-dom'


const Acesso = () => {
    const toast = useToast();
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

  function validarCampo(value) {
    let error
    if (!value) {
      error = 'Campo obrigatório!'
    }
    return error
  }

  const handlePassword = async (values) => {
    sessionStorage.setItem('senha', values.senha);
    if (values.senha !== "ManutT05") {
      toast({
        title: "Senha incorreta",
        description: "Tente novamente",
        status: "warning",
        duration: 3000,
        isClosable: true
      });
      return;
    }
    window.location.reload()
    console.log(values.senha)
  
  }

  return (
    <>
    
    <NavBar nomePagina='RETIRADA'/>

    <div className='content'>
        <Formik
        initialValues={{
            senha: ""
        }}

        onSubmit={async (values, actions) => {
            await handlePassword(values)
            actions.setSubmitting(false)
        }}
        >
        {(props) => (
            <Form>
            <Box border="1px solid #ccc" borderRadius={6} p={4} m={2.5}>
                <FormLabel fontWeight="bold">Senha da manutenção</FormLabel>

                {/* UID */}
                <Field name="senha" validate={validarCampo}>
                {({ field, form }) => (
                    <FormControl
                    mb={3}
                    isInvalid={form.errors.senha && form.touched.senha}
                    >
                    <FormLabel>Digite a senha da manutenção</FormLabel>
                    <InputGroup size='md'>
                        <Input
                            type={show ? 'text' : 'password'}
                            placeholder='Insira senha'
                            {...field} // 🔑 Conecta o Input ao Formik
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? <BsEye /> : <BsEyeSlash />}
                            </Button>
                        </InputRightElement>
                        </InputGroup>

                    <FormErrorMessage>{form.errors.senha}</FormErrorMessage>
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
                Entrar
            </Button>
            </Form>
        )}
        </Formik>
    </div>
    </>
  )
}

export {Acesso}