import React, { useReducer, useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Editable,
  EditablePreview,
  EditableTextarea,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/AuthReducer/action";
import {
  checkCharacter,
  checkEmail,
  checkMobile,
  checkPassword,
  checkSignupForm,
  setToast,
} from "../components/Other/CheckProperty";
import emcLogo from "../img/EMC3.png"

const initialState = {
  name: "",
  email: "",
  password: "",
  username: "",
  mobile: 0,
  description: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
    case "description":
      return { ...state, description: action.payload };
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "username":
      return { ...state, username: action.payload };
    case "mobile":
      return { ...state, mobile: action.payload };
    default:
      return state;
  }
};

const Signup = () => {
  const [state, setState] = useReducer(reducer, initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const loading = useSelector((store) => store.AuthReducer.isLoading);
  const [eye, setEye] = useState(false);
  const handleEye = () => {
    setEye((prev) => !prev);
  };
  const signupHandle = () => {
    const isEmpty = checkSignupForm(state);
    if (!isEmpty.status) {
      return setToast(toast, isEmpty.message, "error");
    }
    const isCharacter = checkCharacter(state.name);
    if (!isCharacter.status) {
      return setToast(toast, isCharacter.message, "error");
    }
    const isEmail = checkEmail(state.email);
    if (!isEmail.status) {
      return setToast(toast, isEmail.message, "error");
    }
    const isPassword = checkPassword(state.password);
    if (!isPassword.status) {
      return setToast(
        toast,
        "Password must contain these things:",
        "error",
        3000,
        isPassword.message
      );
    }
    const isMobile = checkMobile(state.mobile);
    if (!isMobile.status) {
      setToast(toast, isMobile.message, "error");
      return isMobile.status;
    }
    dispatch(register(state, toast)).then((res) => {
      if (res.payload.msg === "signup successfully") {
        toast({
          title: "Registered Successful",
          description: "You are successfully Registered",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        navigate("/login", { replace: true });
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
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>

        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack align={"center"}>
            <Image width={["100px"]} m="-1" src={emcLogo}/>

            <Heading
            fontSize={"4xl"}
            textAlign={"center"}
            >
              Registrarse
            </Heading>
          </Stack>

          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="Name" isRequired>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    type="text"
                    value={state.name}
                    onChange={(e) =>
                      setState({ type: "name", payload: e.target.value })
                    }
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="username" isRequired>
                  <FormLabel>Usuario</FormLabel>
                  <Input
                    type="text"
                    value={state.username}
                    onChange={(e) =>
                      setState({ type: "username", payload: e.target.value })
                    }
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Dirección de correo</FormLabel>
              <Input
                type="email"
                value={state.email}
                onChange={(e) =>
                  setState({ type: "email", payload: e.target.value })
                }
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Contraseña</FormLabel>
              <InputGroup>
                <Input
                  type={eye ? "text" : "password"}
                  value={state.password}
                  onChange={(e) =>
                    setState({ type: "password", payload: e.target.value })
                  }
                />
                <InputRightElement h={"full"}>
                  <Button onClick={handleEye} variant={"ghost"}>
                    <ViewIcon />
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Box>
              <FormControl id="mobile" isRequired>
                <FormLabel>Teléfono</FormLabel>
                <Input
                  type="number"
                  value={state.mobile}
                  onChange={(e) =>
                    setState({ type: "mobile", payload: e.target.value })
                  }
                />
              </FormControl>
            </Box>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"black"}
                color={"whitesmoke"}
                _hover={{
                  bg: "#ed7133",
                  color: "white",
                  border: "1px solid #ed7133",
                }}
                onClick={signupHandle}
              >
                {loading ? <Spinner /> : "Registrarme"}
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                ¿Ya estás registrado?
                <RouterLink to="/login" color={"blue.400"}>
                  Iniciar sesión
                </RouterLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Signup;
