import {
  Avatar,
  Box,
  Flex,
  Heading,
  Icon,
  // Spacer,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import NewsLetter from "../Other/NewsLetter";
const Footer = () => {
  const [isLargerThan] = useMediaQuery("(min-width: 768px)");
  const [isSmallerThan] = useMediaQuery("(min-width: 468px)");

  return (
    <div className="Footer">
      <Box
        bg="black"
        color="whitesmoke"
        height={isSmallerThan ? "50vh" : "50vh"}
        pt="3rem"
        lineHeight="2rem"
      >
        <Flex
          justify={"space-evenly"}
          width={["100%", "100%", "100%", "100%"]}
          textAlign={isSmallerThan ? "left" : "center"}
          fontSize={["sm", "md", "md", "md"]}
          flexDirection={isSmallerThan ? "row" : "column"}
        >
          <Box as={Flex} flexDirection="column">
            <Heading>Productos</Heading>
            <Text as={Link} to="/allproducts?gender=MEN">Hombres</Text>
            <Text as={Link} to="/allproducts?gender=WOMEN">Mujeres</Text>
          </Box>

          {isSmallerThan ? (
            <Box>
              <Heading>Ayuda</Heading>
              <Text>Servicio al cliente</Text>
              <Text>Envios</Text>
              <Text>Rastrear pedido</Text>
              <Text>Devoluciones</Text>
            </Box>
          ) : null}

          {isLargerThan ? (
            <Box>
              <Heading>Acerca de nosotros</Heading>
              <Text>Marca</Text>
              <Text>Carreras</Text>
              <NewsLetter />
            </Box>
          ) : null}
        </Flex>
      </Box>
    </div>
  );
};

export default Footer;
