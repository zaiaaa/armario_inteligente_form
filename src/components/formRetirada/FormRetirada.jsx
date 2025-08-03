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

function FormRetirada({ aoAdicionar, aoRevisar }) {
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
    for (let i = 0; i < numRetiradas; i++) {
      iniciais[`tag_${i}`] = '';
      iniciais[`local_${i}`] = '';
    }
    return iniciais;
  };

  return (
    <>
      <FormControl mb={4} ml={4} mt={4} width={"20rem"}>
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
          const lockouts = [];

          for (let i = 0; i < numRetiradas; i++) {
            lockouts.push({
              tag: values[`tag_${i}`],
              local: values[`local_${i}`],
            });
          }

          aoAdicionar(lockouts);
          aoRevisar(lockouts);
        }}
      >
        {(props) => (
          <Form>
            {[...Array(numRetiradas)].map((_, i) => (
              <Box key={i} border="1px solid #ccc" borderRadius={6} p={4} m={2.5}>
                <FormLabel fontWeight="bold">Lockout {i + 1}</FormLabel>

                {/* Campo Select - TAG */}
                <Field name={`tag_${i}`} validate={validarCampo}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors[`tag_${i}`] && form.touched[`tag_${i}`]}
                      mb={3}
                    >
                      <FormLabel>Tag</FormLabel>
                      <Select {...field} placeholder="Selecione o lockout" color="#000">
                        <option disabled value="S-01">S-01 - em uso</option>
                        <option value="S-02">S-02</option>
                        <option value="S-03">S-03</option>
                      </Select>
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
              Enviar
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export { FormRetirada };
