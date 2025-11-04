import { Field, Form, Formik } from 'formik';
import {
  Button,
  FormControl,
  FormLabel,
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
import { DialogAlert } from '../DialogAlert/DialogAlert';

function FormDevolucao({ aoRevisar, lockouts = [], uid }) {
  const [numDevolucao, setNumDevolucao] = useState(1);
  const [lockoutSelecionado, setLockoutSelecionado] = useState(null);
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
    for (let i = 0; i < numDevolucao; i++) {
      iniciais[`tag_${i}`] = '';
      iniciais[`local_${i}`] = '';
    }
    return iniciais;
  };

  return (
    <>
      <FormControl mb={4} ml={4} mt={4} width={"20rem"}>
        <FormLabel>Nº de lockouts Devolvidos</FormLabel>
        <NumberInput
          max={50}
          min={1}
          value={numDevolucao}
          onChange={(value) => setNumDevolucao(Number(value))}
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

          for (let i = 0; i < numDevolucao; i++) {
            lockouts.push({
              tag: values[`tag_${i}`],
            });
          }

          aoRevisar(lockouts);
        }}
      >
        {(props) => (
          <Form>
            {[...Array(numDevolucao)].map((_, i) => (
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
                      <Select {...field} placeholder="Selecione o lockout" color="#000" onChange={(e) => {
                        field.onChange(e)
                        setLockoutSelecionado(e.target.value)
                      }}>
                        {
                          lockouts.map((lockout, index) => (
                            <option key={index} disabled={lockout.status == "devolvido"} value={lockout.tag}>{lockout.tag} {lockout.status == "devolvido" ? "- Já devolvido!" : ""}</option>

                          ))
                        }
                      </Select>
                      <FormErrorMessage>{form.errors[`tag_${i}`]}</FormErrorMessage>
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
      <DialogAlert lockoutSelecionado={lockoutSelecionado} uid={uid}/>
    </>
  );
}

export { FormDevolucao };
