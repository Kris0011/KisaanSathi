import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as io from "socket.io-client";
import MyTimer from "./Timer";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@chakra-ui/react";
const socket = io.connect("http://localhost:3000");
import { motion } from "framer-motion";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

const AuctionRoom = () => {
  const [expirTime, setExpirTime] = useState(null);
  const [auction, setAuction] = useState({
    _id: "",
    userId: "",
    cropName: "",
    winner: "",
    expireTime: "",
    bidPrice: "",
    currentBidder: "",
  });
  const navigate = useNavigate();

  const [bids, setBids] = useState<{ bidAmount: number }[]>([]);

  const [chat, setChat] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [bidder, setBidder] = useState("No Bidder");
  const auc = useSelector((state: any) => state.user.auction);
  const user = useSelector((state: any) => state.user.user);
  const [history, setHistory] = useState<string[]>([]);

  const onExpire = async () => {
    try {
        setBids(bids);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  const sendMessage = async () => {
    try {
      socket.emit("message-passed", { auction_id: auc._id, message: message });
    } catch (e) {
      console.log("error" + e);
    }
  };

  useEffect(() => {
    setAuction(auc);
    const expireT = new Date(auc?.expireTime).getTime();
    setExpirTime(expireT as any);
    socket.emit("joinAuction", { auctionId: auc?._id, userId: user?._id });
    setBidder(auc?.bidder);
  }, [auc]);

  useEffect(() => {
    socket.on("updateAuction", (updatedAuction: any) => {
      setBidder(updatedAuction.bidder);
      setAuction({
        ...updatedAuction.updatedAuction,
        winner: "",
      });

      socket.on("message-to-all", (data) => {

        const chat = data.message;
        console.log(chat);
        setChat((chat) => {
          return [...chat, data.message];
        });
      });

      const currentTime = new Date().toLocaleTimeString();
      const message = `${currentTime} Bid from ${updatedAuction.bidder} of Amount ${updatedAuction.updatedAuction.bidPrice}`;
      setHistory((prevHistory) => [...prevHistory, message]);
      console.log(history);
    });

    return () => {
      socket.off("updateAuction");
      socket.off("message-to-all");
    };
  }, []);

  const placeBid = (bidAmount: any) => {
    socket.emit("placeBid", { auction: auction, bidAmount, bidder: user.name });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1 className="text-3xl ">Auction Room of {auction?.cropName}</h1>
      <div className="flex">
        <div className="glassy-effect p-4 shadow-md rounded-md m-2 w-[500px]">
          <p>Current Bidder: {bidder} </p>
          <p>Current Price: {auction?.bidPrice} </p>
          <Button
            className="m-4"
            onClick={() =>
              placeBid(
                bids.length > 0 ? bids[bids.length - 1].bidAmount + 1 : 1
              )
            }
          >
            Place Bid
          </Button>
          {expirTime && (
            <MyTimer expiryTimestamp={expirTime} onExpire={onExpire} />
          )}
        </div>

        <div className="glassy-effect h-[500px] w-[500px] m-2 p-2">
        <Tabs variant='enclosed'>
          <div></div>
          <TabList>
            <Tab color={"white"} >Histoy</Tab>
            <Tab color={"white"}>Live chat</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <div className="">
                <h1 className="text-xl font-semibold m-1 mb-3">
                  History of Auction
                </h1>
                <div className=" overflow-y-auto h-[400px]">
                  {history.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5 }}
                      className=""
                    >
                      <p
                        key={index}
                        className="bg-gray-200 text-black my-2 p-1 w-2/3 mx-auto rounded-md text-sm shadow-md"
                      >
                        {message}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="">
                <h1 className="text-xl font-semibold m-1 mb-3">Live Chat</h1>
                <div className=" overflow-y-auto h-[320px]">
                  {chat.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5 }}
                      className=""
                    >
                      <p
                        key={index}
                        className="bg-gray-200 text-black my-2 p-1 w-2/3 mx-auto rounded-md text-sm shadow-md"
                      >
                        {message}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="flex space-x-2 m-1">

              <Input
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              className="text-black "
              value={message}
              bg={"white"}
            ></Input>

            <Button onClick={sendMessage}>send</Button>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>

        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Bid History</h3>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {bids.map((bid, index) => (
              <li
                key={index}
                style={{
                  border: "1px solid #eee",
                  padding: "10px",
                  margin: "5px",
                  borderRadius: "5px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                Bidder: {bidder}, Amount: {bid.bidAmount}
              </li>
            ))}
            
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AuctionRoom;
