import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Image, Text, Heading } from "@chakra-ui/react";
import Slider from "react-slick";

const Carrossel = ({imagens = []}) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

//   const imagens = [
//     { src: "/assets/armario1.jpg", legenda: "Controle inteligente de lockouts" },
//     { src: "/assets/armario2.jpg", legenda: "Segurança e praticidade na Toyota" },
//     { src: "/assets/armario3.jpg", legenda: "Automação com RFID e IoT" },
//   ];

  return (
    <Box w="100%" maxW="1200px" h={"100%"} maxH={"300px"} m="auto" mt={10} borderRadius="md" overflow="hidden" shadow="md" mb={4}>
      <Slider {...settings}>
        {imagens.map((img, i) => (
          <Box key={i} position="relative">
            <Image src={img.src} alt={img.legenda} w="100%" maxH="300px" objectFit="cover" />
            {/* <Heading 
                as="h3" 
                position="absolute" 
                bottom="50px"   // ← sobe o título um pouco acima do texto
                w="100%"
                textAlign="center"
                color="white"
            >
                Armário Inteligente
            </Heading> */}
            <Text
                position="absolute"
                bottom={0}
                w="100%"
                color="white"
                p={3}
                textAlign="center"
                fontSize="xl"
                style={{
                    background: "#000000",
                    background: "linear-gradient(0deg, rgba(25, 25, 25, 1) 0%, rgba(255, 255, 255, 0) 100%)",
                }}>
              {img.legenda}
            </Text>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}

export {Carrossel}
