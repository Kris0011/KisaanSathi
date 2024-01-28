import { useState , useEffect } from "react";
import "./App.css";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Auction from "./components/Auction/AuctionPage";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import AuctionRoom from "./components/Auction/AuctionRoom";
import { Toaster } from 'react-hot-toast';
import ProfilePage from "./components/Profile/ProfilePage";

function App() {
  const dispatch = useDispatch()
  const user = useSelector((state : any) => state.user.user) || {};
  const loadUser = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/v1/me", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      // console.log(data)

      if (data.user) {
        dispatch({ type: "SET_USER", payload: data.user });
        toggleLogin();
        
      } else {
        dispatch({ type: "CLEAR_USER" });
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    loadUser();
    // toast.success('Welcome to KisaanSathi')
  }, [])



  const routes = [
    {
      path: "/",
      name : "Home",
    },
    {
      path: "/auction",
      name : "Auction",
    },{
      path : "http://localhost:8501/" ,
      name : "Crop Prediction"
    } ,
    {
      path : "http://localhost:8502/" ,
      name : "Disease Detection"
    }

  ]


  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };


  




  return (
    <div className="flex min-h-screen flex-col items-center">
      <Router>

      {/* <div className="bgContainer1"></div> */}
      <Toaster />
      <div className="mb-24 ">
      <Nav toggleLogin={toggleLogin} isLoggedIn={isLoggedIn} routes={routes} user={user} />


      </div>


      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auction" element={<Auction isLoggedIn={isLoggedIn} user={user}/>} />
      <Route path="/auctionPage" element={<AuctionRoom />} />
      <Route path="/profile" element={<ProfilePage toggleLogin={toggleLogin} isLoggedIn={isLoggedIn} user={user}  dispatch={dispatch}/>} />

      

      </Routes>

      </Router>

    </div>
  );
}

export default App;
