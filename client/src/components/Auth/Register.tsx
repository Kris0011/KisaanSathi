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
  Avatar,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface RegisterProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
}

export default function Register({
  isOpen,
  onClose,
  onOpenLogin,
}: RegisterProps) {
  const handleLoginAndClose = () => {
    onOpenLogin();
    onClose();
  };

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
    avtar: "",
    contact : "",
    address : "",

  });


  const [photoURL, setPhotoURL] = useState("/profile.png");
  // const toast = useToast();

 

  const registerUser = async (e: any) => {
    // e.preventDefault();
    
    // const { name, email, password, contact , address } = data;
    // console.log(name, email, password, contact , address);

    // console.log(data);
    
    
    try{
      const res = await axios.post("http://localhost:3000/api/v1/register", data ,
      {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      console.log(res.data);
      toast.success("OTP sent to your email");
     
    }
    catch(err){
      console.log(err)
      toast.error("Invalid Credentials");

    }

    };

    const verifyOTP = async (e: any) => {
      // e.preventDefault();
      
    try{
      const res = await axios.post("http://localhost:3000/api/v1/verify", data ,
      {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      console.log(res.data);
     
      toast.success("Registered in successfully");
      onClose();
    }
    catch(err){
      console.log(err)
      toast.error("Invalid Credentials");

    }

    }


    

  const updateData = (e: any) => {
    const { name, value, files } = e.target;
    if (name == "avtar" && files && files[0]) {
      const imageFile = files[0];
      setData((prevData) => ({
        ...prevData,
        [name]: imageFile,
      }));
      const url = URL.createObjectURL(imageFile);
      setPhotoURL(url);
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    // console.log(data);
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay bg='none'
      backdropFilter='auto'
      backdropInvert='15%'
      backdropBlur='2px'/>
      <ModalContent bg={"rgb(39 39 42)"} borderRadius={10}>
        <ModalHeader className=" bg-opacity-100 shadow-lg text-white">
          Register
        </ModalHeader>
        <ModalCloseButton className="text-white" />
        <ModalBody className="space-y-2  bg-opacity-100  text-gray-900">
          <FormControl>
            <FormLabel color="white">Username:</FormLabel>
            <Input
              name="name"
              onChange={updateData}
              placeholder="Enter your username"
              bg="gray.300"
            />
          </FormControl>
          <FormControl>
            <FormLabel color="white">Email:</FormLabel>
            <Input
              name="email"
              onChange={updateData}
              type="email"
              placeholder="Enter your email"
              bg="gray.300"
            />
          </FormControl>
          <FormControl>
            <FormLabel color="white">Password:</FormLabel>
            <Input
              name="password"
              onChange={updateData}
              type="password"
              placeholder="Enter your password"
              bg="gray.300"
            />
          </FormControl>
          <FormControl>
            <FormLabel color="white">Contact:</FormLabel>
            <Input
              name="contact"
              onChange={updateData}
              type="number"
              placeholder="Enter your contact"
              bg="gray.300"
            />
          </FormControl>
          <FormControl>
            <FormLabel color="white">Address:</FormLabel>
            <Input
              name="address"
              onChange={updateData}
              type="text"
              placeholder="Enter your address"
              bg="gray.300"
            />
          </FormControl>
          <FormControl className="flex items-center  h-full">
            <FormLabel color="white">Avatar:</FormLabel>
            <Input
              name="avtar"
              onChange={updateData}
              type="file"
              accept=".jpg, .jpeg, .png"
              width={200}
              size="lg"
              border={0}
              color={"white"}
            />
            <Avatar className="" src={photoURL} width={20} height={20} />
          </FormControl>

          <div className="flex  items-center">
            
            <FormControl>
              <Input
                name="otp"
                onChange={updateData}
                placeholder="Enter the OTP"
                bg="gray.300"
              />
            </FormControl>
            <Button colorScheme="teal" m={3} onClick={registerUser}>
              Get the OTP
            </Button>
          </div>

          <Text color="white" cursor="pointer">
            Already have an account?{" "}
            <span className="text-blue-400" onClick={handleLoginAndClose}>
              {" "}
              Login now
            </span>
          </Text>
        </ModalBody>
        <ModalFooter className=" bg-opacity-100 shadow-lg text-white">
          <Button colorScheme="teal" m={3} onClick={verifyOTP}>
            Register{" "}
          </Button>

          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
