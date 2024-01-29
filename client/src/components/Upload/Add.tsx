import { useState } from "react";
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

const AddButton = ({ user }: any) => {
  const {
    isOpen: isOpenAuction,
    onOpen: onOpenAuction,
    onClose: onCloseAuction,
  } = useDisclosure();

  const [auctionData, setAuctionData] = useState({
    cropName: "",
    auctionTime: "",
    cropImage: null,
    bidPrice: 0,
  });

  const updateAuctionData = (e: any) => {
    if(e.target.name === "cropImage" && e.target.files[0] ){
      setAuctionData({
        ...auctionData,
        [e.target.name]: e.target.files[0],
      });
      return;
    }
    setAuctionData({
      ...auctionData,
      [e.target.name]: e.target.value,
    });
  };

  const createAuction = async (e: any) => {

    e.preventDefault();
    
   
    const cropName = auctionData.cropName;
    const userId = user._id;
    const expireTime = auctionData.auctionTime;
    const bidPrice = auctionData.bidPrice;
    const cropImage = auctionData.cropImage;

    console.log(cropName, userId, expireTime, bidPrice, cropImage);
    

    try {
      await axios.post("http://localhost:3000/api/v1/auction", {
        cropName,
        userId,
        expireTime,
        bidPrice,
        cropImage,
      }, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      toast.success("Auction Created Successfully");
      onCloseAuction();
    } catch (err) {
      toast.error("Error in creating Auction");
    }
  };

  const openAuction = () => {
    if (user) {
      onOpenAuction();
    }
  };

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
            <MenuItem
              bg={"bg.gray.800"}
              icon={<CopyIcon />}
              onClick={openAuction}
            >
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
          <ModalBody className="space-y-2 bg-gray-800 bg-opacity-100 shadow-lg text-gray-900">
            <FormControl>
              <FormLabel color="white">Name:</FormLabel>
              <Input
                placeholder="Name"
                name="cropName"
                onChange={updateAuctionData}
                bg="gray.300"
              />
            </FormControl>

            <FormControl>
              <FormLabel color="white">Auction Time:</FormLabel>
              <Input
                type="datetime-local"
                name="auctionTime"
                onChange={updateAuctionData}
                bg="gray.300"
              />
            </FormControl>

            <FormControl>
              <FormLabel color="white">Bid Starting Price:</FormLabel>
              <Input
                type="number"
                name="bidPrice"
                onChange={updateAuctionData}
                bg="gray.300"
              />
            </FormControl>

            <FormControl>
              <FormLabel color="white">Image File:</FormLabel>
              <Input
                type="file"
                name="cropImage"
                accept=" .jpg, .jpeg, .png"
                onChange={updateAuctionData}
                bg="gray.300"
              />
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
