import {useState}from "react";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import toast from "react-hot-toast";
import axios from "axios";


import { AddIcon, CopyIcon } from "@chakra-ui/icons";

const AddButton = ( {user }: any) => {

  const {
    isOpen: isOpenAuction,
    onOpen: onOpenAuction,
    onClose: onCloseAuction,
  } = useDisclosure();
  

  const [ auctionData , setAuctionData] = useState({
    cropName : "",
  })

  const updateAuctionData = (e: any) => {
    setAuctionData({
      ...auctionData,
      [e.target.name] : e.target.value,
      
    })
    
    
  }

  const createAuction = async () => {


    const cropName = auctionData.cropName;
    const userId = user._id;


     try{
      const res = await axios.post("http://localhost:3000/api/v1/auction", { cropName , userId } ,
      {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      }
      );
      if( res) {
        toast.success("Auction Created");
        onCloseAuction();
      }
      
    }
    catch(err){
      // console.log(err)
      toast.error("Invalid Details");

    }


  }

  const openAuction = () => {
    if(user){
      onOpenAuction();
    }
  }




  

  



  return (
    <div>
      <Box position="fixed" bottom="5" right="5" zIndex={100}>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Add"
            icon={<AddIcon />}
            variant="outline"
            colorScheme="white"
            transition="all 0.2s"
            borderRadius="10"
            color={"white"}
            borderWidth="0px"
            bg="blue.500"
            _hover={{ bg: "gray.400" }}
            _expanded={{ bg: "blue.400" }}
            _focus={{ boxShadow: "outline" }}
          />
          <MenuList bg={"bg.gray.800"}>
            <MenuItem bg={"bg.gray.800"} icon={<CopyIcon />} onClick={openAuction}>
              Create Auction
            </MenuItem>
            {/* <MenuItem bg={"bg.gray.800"} icon={<EditIcon />} onClick={onOpenAuction}>
              Post Blog
            </MenuItem> */}
          </MenuList>
        </Menu>
      </Box>

      {/* Modal for Auction */}
      <Modal onClose={onCloseAuction} isOpen={isOpenAuction} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className=" bg-gray-800  bg-opacity-100 shadow-lg text-white">
            Create Auction
          </ModalHeader>
          <ModalCloseButton className="text-white" />
          <ModalBody className="space-y-2 bg-gray-800  bg-opacity-100 shadow-lg text-gray-900">
            <FormControl>
              <FormLabel color="white">Name:</FormLabel>
              <Input placeholder=""  name="cropName" onChange={updateAuctionData} bg="gray.300" />
            </FormControl>
            
          </ModalBody>
          <ModalFooter className=" bg-gray-800  bg-opacity-100 shadow-lg text-white">
            <Button colorScheme="teal" m={3} onClick={createAuction}>
              Create Auction
            </Button>
            <Button onClick={onCloseAuction}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      
    </div>
  );
};

export default AddButton;
