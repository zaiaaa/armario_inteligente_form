import { Field, Form, Formik } from 'formik';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function FormRetirada({ aoRevisar, lockouts = [], edicao = false, tagEdicao = "" }) {
  const [numRetiradas, setNumRetiradas] = useState(1);
  const navigate = useNavigate();

  function validarCampo(value) {
    let error;
    if (!value) {
      error = 'Campo obrigatório!';
    }
    return error;
  }

  const gerarValoresIniciais = () => {
    const iniciais = {};
    const qtd = edicao ? 1 : numRetiradas; // fixa 1 se for edição
    for (let i = 0; i < numRetiradas; i++) {
      iniciais[`tag_${i}`] = edicao ? tagEdicao : '';
      iniciais[`local_${i}`] = '';
    }
    return iniciais;
  };

  return (
    <>
      <FormControl mb={4} ml={4} mt={4} width={"20rem"} visibility={edicao ? "hidden" : ""}>
        <FormLabel>Nº de lockouts retirados</FormLabel>
        <NumberInput
          max={50}
          min={1}
          value={numRetiradas}
          onChange={(value) => setNumRetiradas(Number(value))}
          width={"4rem"}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>

      <Formik
        enableReinitialize
        initialValues={gerarValoresIniciais()}
        onSubmit={(values) => {
          const qtd = edicao ? 1 : numRetiradas;
          const lockouts = [];

          for (let i = 0; i < qtd; i++) {
            lockouts.push({
              tag: values[`tag_${i}`],
              local: values[`local_${i}`],
            });
          }

          aoRevisar(lockouts);
        }}
      >
        {(props) => {
          const qtd = edicao ? 1 : numRetiradas;
          return (
          
          <Form>
            {[...Array(qtd)].map((_, i) => (
              <Box key={i} border="1px solid #ccc" borderRadius={6} p={4} m={2.5}>
                <FormLabel fontWeight="bold">Lockout {!edicao ? i + 1 : "sendo editado:"}</FormLabel>

                {/* Campo Select - TAG */}
                <Field name={`tag_${i}`} validate={validarCampo}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors[`tag_${i}`] && form.touched[`tag_${i}`]}
                      mb={3}
                    >
                      <FormLabel>Tag</FormLabel>
                      
                      {
                        !edicao ? (
                          <Select {...field} isDisabled={edicao} placeholder="Selecione o lockout" color="#000">
                            {
                              lockouts.map((lockout, index) => (
                                <option key={index} disabled={lockout.status == "retirado"} value={lockout.tag}>{lockout.tag} {lockout.status == "retirado" ? "- Já em uso!" : ""}</option>

                              ))
                            }
                          </Select>
                        )
                        :
                        (
                        <Input
                          
                          {...field}
                          placeholder="Local de uso do Lockout"
                          color="#000"
                          disabled={true}
                        />

                        )
                      }


                      <FormErrorMessage>{form.errors[`tag_${i}`]}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                {/* Campo Input - LOCAL */}
                <Field name={`local_${i}`} validate={validarCampo}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors[`local_${i}`] && form.touched[`local_${i}`]}
                    >
                      <FormLabel>Local</FormLabel>
                      <Input
                        {...field}
                        placeholder="Local de uso do Lockout"
                        color="#000"
                      />
                      <FormErrorMessage>{form.errors[`local_${i}`]}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Box>
            ))}

            <Button
              mt={4}
              ml={5}
              mb={10}
              colorScheme="green"
              isLoading={props.isSubmitting}
              type="submit"
            >
              {!edicao ? "Enviar" : "Retirar Lockout!"}
            </Button>
          </Form>
        )}}
      </Formik>
    </>
  );
}

export { FormRetirada };
