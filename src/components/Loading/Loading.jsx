import { Spinner, Center } from '@chakra-ui/react';

const Loading = () => {
  return (
    <Center mt="5rem">
      <Spinner
        size="xl"         // Tamanho grande
        thickness="4px"   // Espessura da borda
        speed="0.7s"      // Velocidade de rotação
        color="red.500"   // Cor vermelha
      />
    </Center>
  );
};

export { Loading };
