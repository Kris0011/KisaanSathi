import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from 'react-redux'

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRegister: () => void;
  toggleLogin: () => void;
}

export default function Login({
  isOpen,
  onClose,
  onOpenRegister,
  toggleLogin,
}: LoginProps) {

  const dispatch = useDispatch();
  // const toast = useToast();
  const [Loading, setLoading] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleRegisterAndClose = () => { 
    onClose();
    onOpenRegister();
  };

  const updateEmail = (e: any) => {
    setData((prevData) => ({
      ...prevData,
      email: e.target.value,
    }));
  };

  const updatePassword = (e: any) => {
    setData((prevData) => ({
      ...prevData,
      password: e.target.value,
    }));
  };

  const loginUser = async (e: any) => {
    e.preventDefault();
    console.log(data);

    setLoading(true);

    try{
      const res = await axios.post("http://localhost:3000/api/v1/login", data ,
      {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      console.log(res.data);
      if(res.data.user){
        dispatch({type:"SET_USER",payload:res.data.user})
      }
      toast.success("Logged in successfully");
      toggleLogin();
      onClose();
    }
    catch(err){
      // console.log(err)
      toast.error("Invalid Credentials");

    }
    setLoading(false);

    


    

   
    
  };

  

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay bg='none'
      backdropFilter='auto'
      backdropInvert='15%'
      backdropBlur='2px'/>
      <ModalContent borderRadius={10} bg={"rgb(39 39 42)"}>
        <ModalHeader className=" shadow-lg text-white">
          Login
        </ModalHeader>
        <ModalCloseButton className="text-white" />
        <ModalBody className="space-y-2  shadow-lg text-gray-900">
          <FormControl>
            <FormLabel color="white">Email:</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              bg="gray.300"
              onChange={updateEmail}
            />
          </FormControl>
          <FormControl>
            <FormLabel color="white">Password:</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              bg="gray.300"
              onChange={updatePassword}
            />
          </FormControl>
          <Text color="white" cursor="pointer">
            Don't have an account?{" "}
            <span className="text-blue-400" onClick={handleRegisterAndClose}>
              Register now
            </span>
          </Text>
        </ModalBody>
        <ModalFooter className=" bg-opacity-100 shadow-lg text-white">
          <Button isLoading={Loading} loadingText='logging in..' colorScheme="teal" m={3} onClick={loginUser}>
            Login
          </Button>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    
  );
}


