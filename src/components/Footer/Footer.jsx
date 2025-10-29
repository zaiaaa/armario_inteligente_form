import { Box, Text, Flex, Link, VStack, HStack } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box
      bg="gray.900"
      color="white"
      py={8}
      px={{ base: 4, md: 16 }}
      mt={16}
    >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        align={{ base: 'flex-start', md: 'center' }}
      >
        {/* Sobre */}
        <VStack align="flex-start" spacing={2} mb={{ base: 4, md: 0 }}>
          <Text fontWeight="bold" fontSize="lg">
            Armário Inteligente Toyota
          </Text>
          <Text fontSize="sm" maxW="400px">
            O Armário Inteligente da Toyota permite controle e devolução de lockouts de forma segura e eficiente, facilitando o gerenciamento de ferramentas e dispositivos dentro da empresa.
          </Text>
        </VStack>

        {/* Links úteis */}
        <HStack spacing={6}>
          <Link href="#" fontSize="sm" _hover={{ textDecoration: 'underline' }}>
            Política de Privacidade
          </Link>
          <Link href="#" fontSize="sm" _hover={{ textDecoration: 'underline' }}>
            Termos de Uso
          </Link>
          <Link href="#" fontSize="sm" _hover={{ textDecoration: 'underline' }}>
            Contato
          </Link>
        </HStack>
      </Flex>

      {/* Copyright */}
      <Text fontSize="xs" textAlign="center" mt={6} color="gray.400">
        &copy; {new Date().getFullYear()} Toyota Armário Inteligente. Todos os direitos reservados.
      </Text>
    </Box>
  );
}


export {Footer}