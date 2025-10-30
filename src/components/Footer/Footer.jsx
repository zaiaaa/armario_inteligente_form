import { Box, Text, Flex, Link, VStack, HStack } from '@chakra-ui/react';
import norma from "../../assets/norma.pdf"

const Footer = () => {
  return (
    <Box
      bg="#0D0D0D"
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
        <VStack align="center" spacing={2} mb={{ base: 4, md: 0 }} w={"100%"} >
          <Text fontWeight="bold" fontSize="lglg" color={"#FF0000"} >
            Armário Inteligente Toyota
          </Text>
        </VStack>

        {/* Links úteis */}
        <Flex w="100%" justify="space-around" align="center" mt={2}>
            <Link href="/sobre" fontSize="sm" _hover={{ textDecoration: 'underline' }} color="#fff">
                Sobre
            </Link>
            <Link href={norma} target='_blank' fontSize="sm" _hover={{ textDecoration: 'underline' }} color="#fff">
                Manual de Uso
            </Link>
            <Link href="https://github.com/zaiaaa/armario_inteligente_form" target='_blank' fontSize="sm" _hover={{ textDecoration: 'underline' }} color="#fff">
                Github
            </Link>
        </Flex>

      </Flex>

      {/* Copyright */}
      <Text fontSize="xs" textAlign="center" mt={6} color="#fff">
        &copy; {new Date().getFullYear()} Toyota Armário Inteligente. Todos os direitos reservados.
      </Text>
    </Box>
  );
}


export {Footer}