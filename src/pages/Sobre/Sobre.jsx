import { Box, VStack, HStack, Text, Heading, Avatar, SimpleGrid, Image } from '@chakra-ui/react';
import { NavBar } from '../../components/NavBar/NavBar';
import zaia from "../../assets/resp/zaia.jpeg"
import joao from "../../assets/resp/joao.jpeg"
import gabi from "../../assets/resp/gabi.jpeg"
import alisson from "../../assets/resp/alisson.jpeg"
import bg_armario from "../../assets/bg-armario.jpeg"
import furo from "../../assets/furo.jpeg"
import trava from "../../assets/trava.jpeg"


import { Carrossel } from '../../components/Carousel/Carousel';
import {Footer} from "../../components/Footer/Footer"

const Sobre = () => {
  const integrantes = [
    { nome: 'Gustavo Zaia', papel: 'Desenvolvedor Fullstack', foto: zaia },
    { nome: 'João Pedro', papel: 'Desenvolvedor Backend', foto: joao },
    { nome: 'Gabrielly Leão', papel: 'Designer UI/UX', foto: gabi },
    { nome: 'Alisson Cauã', papel: 'Designer UI/UX', foto: alisson },
    // adicione outros integrantes aqui
  ];

  return (
    <>
    
        <NavBar nomePagina='SISTEMA'/>
        
        <Box className='content'>
        {/* <Image src={bg_armario}></Image> */}
        <Carrossel imagens={[{ src: bg_armario, legenda: "Controle inteligente de lockouts" },
        { src: furo, legenda: "Instalação complexa" },
        { src: trava, legenda: "Bloqueio seguro" },
        ]}/>
        {/* Título */}
        
        <VStack spacing={4} mb={10} align="center">
            <Heading as="h1" fontSize={"35px"} size="xl" color={"red"}>Além da segurança</Heading>
            
            <Text textAlign={"justify"}>
            O projeto <strong>Armário Inteligente</strong> foi desenvolvido para otimizar o controle e a devolução de lockouts dentro da Toyota, garantindo maior segurança e praticidade para os colaboradores.
            </Text>
        </VStack>


        {/* Sobre Toyota e SENAI */}
        <VStack spacing={4} mb={10} align="center">
            <Heading as="h2" fontSize={"35px"} size="xl" color={"red"}>TOYOTA</Heading>
            <Text textAlign={"justify"}>
            A Toyota é uma das líderes mundiais na indústria automotiva, com foco em qualidade, inovação e eficiência. Este projeto visa melhorar os processos internos da empresa utilizando tecnologia de automação.
            </Text>

            <Heading as="h2" size="lg" mt={6} color={"red"} fontSize={"35px"}>SENAI</Heading>
            <Text textAlign={"justify"}>
            O SENAI apoia a formação técnica e profissional, incentivando projetos que unem teoria e prática. Nosso projeto foi desenvolvido com base nos conhecimentos adquiridos durante a formação no SENAI.
            </Text>
        </VStack>

        {/* Motivação do Projeto */}
        <VStack spacing={4} mb={10} align="center">
            <Heading as="h2" size="lg" fontSize={"35px"} color={"red"}>Objetivo</Heading>
            <Text textAlign={"justify"}>
            A criação do Armário Inteligente surgiu da necessidade de controlar de forma eficiente os lockouts e chaves dentro da Toyota. Nosso objetivo é aumentar a segurança, reduzir erros humanos e automatizar processos manuais.
            </Text>
        </VStack>

        {/* Integrantes */}
        <VStack spacing={4} align="center">
            <Heading as="h2" size="lg" color={"red"}>Integrantes do Time</Heading>
            <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6} mt={4} mb={4}>
            {integrantes.map((pessoa, i) => (
                <Box key={i} p={4} bg="white" borderRadius="md" shadow="md" textAlign="center">
                <Avatar name={pessoa.nome} src={pessoa.foto} size="xl" mb={2} />
                <Text fontWeight="bold">{pessoa.nome}</Text>
                <Text fontSize="sm" color="gray.600">{pessoa.papel}</Text>
                </Box>
            ))}
            </SimpleGrid>
        </VStack>

        <Footer />
        </Box>
    </>
  );
}

export {Sobre}