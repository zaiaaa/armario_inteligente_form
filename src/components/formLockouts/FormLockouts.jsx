import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast
} from '@chakra-ui/react';
import { Api } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const FormLockouts = () => {
  const navigate = useNavigate()
  const [tag, setTag] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tag.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "Digite a tag antes de cadastrar.",
        status: "warning",
        duration: 3000,
        isClosable: true
      });
      return;
    }
    setIsLoading(true); // inicia o loading

    try {
      const tagFormatada = tag.toUpperCase()
      await Api.post("/status_abertura/cadastrar", { tag: tagFormatada });
      toast({
        title: "Sucesso!",
        description: "Tag cadastrada com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true
      });
      setTag("");
      navigate("/lockouts")
    } catch (error) {
      toast({
        title: "Erro ao cadastrar",
        description: error.response?.data?.message || "Tente novamente.",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    }finally {
        setIsLoading(false); // finaliza o loading
    }
  };


  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      p={4}
      m={4}
      borderWidth={1}
      borderRadius="md"
      boxShadow="sm"
      bg="white"
    >
      <FormControl mb={4}>
        <FormLabel>Tag</FormLabel>
        <Input
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Digite a tag"
        />
      </FormControl>

      <Button type="submit" colorScheme="green" width="full" isLoading={isLoading} >
        Cadastrar Tag
      </Button>
    </Box>
  );
};

export { FormLockouts };
