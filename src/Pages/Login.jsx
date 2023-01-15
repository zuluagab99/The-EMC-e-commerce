import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
//import swal from "sweetalert";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { login } from "../redux/AuthReducer/action";
//import { LOGIN_S } from "../redux/AuthReducer/actionType";
import Navbar from "../components/Navbar/Navbar";
import { ViewIcon } from "@chakra-ui/icons";
import emcLogo from "../img/EMC3.png";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const loading = useSelector((store) => store.AuthReducer.isLoading);
  const pathRoute = location.state?.from?.pathname || "/";
  const [eye, setEye] = useState(false);
  const handleEye = () => {
    setEye((prev) => !prev);
  };
  const loginHandler = () => {
    if (email === "nareshmewada014@gmail.com" && password === "naresh#111*") {
      const params = {
        email,
        password,
      };
      dispatch(login(params, toast)).then(() => {
        navigate("/admin", { replace: true });
      });
    } else if (email && password) {
      const params = {
        email,
        password,
      };
      dispatch(login(params, toast)).then((res) => {
        if (res.payload.msg === "login successfully") {
          toast({
            title: "Login Success",
            description: "You are successfully logged in",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
          navigate(pathRoute, { replace: true });
        } else {
          toast({
            title: res.payload.msg,
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        }
      });
    }
  };

  return (
    <>
      <Flex minH={"100vh"} align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>

          <Box rounded={"lg"} boxShadow={"lg"} p={8}>
            <Stack align={"center"}>
              <Image width={["100px"]} m="-1" src={emcLogo}/>
              <Heading fontSize={"4xl"} color="black">
              Iniciar sesión
              </Heading>
              
             </Stack>
            <Stack spacing={4}>
              <FormControl id="username" isRequired>
                <FormLabel>Correo electrónico</FormLabel>
                <Input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Contraseña</FormLabel>
                <InputGroup>
                  <Input
                    type={eye ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement h={"full"}>
                    <Button variant={"ghost"} onClick={handleEye}>
                      <ViewIcon />
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Recordar datos</Checkbox>
                  <Link color={"#ed7133"}>¿Olvidaste tu contraseña?</Link>
                </Stack>
                <Button
                  bg={"black"}
                  color={"whitesmoke"}
                  _hover={{
                    bg: "#ed7133",
                    color: "white",
                    border: "1px solid #ed7133",
                  }}
                  onClick={loginHandler}
                >
                  {loading ? <Spinner /> : "Ingresar"}
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  ¿No tienes cuenta?
                  <RouterLink to="/register" color={"#ed7133"}>
                     Registrarse
                  </RouterLink>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default Login;
