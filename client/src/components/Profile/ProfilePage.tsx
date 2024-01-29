import axios from "axios";
import { Navigate } from "react-router-dom";
import AddButton from "../Upload/Add";
import { toast } from "react-hot-toast";


type Props = {
  toggleLogin: () => void;
  isLoggedIn: boolean;
  user: any;
  dispatch: any;
};

export default function ProfilePage({
  toggleLogin,
  isLoggedIn,
  user,
  dispatch,
}: Props) {
  // const dispatch = useDispatch();
  const logout = async () => {

    
    try{
      await axios.get("http://localhost:3000/api/v1//logout", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      dispatch({
        type: "CLEAR_USER",
      });

      toast.success("Logged out successfully");
      toggleLogin();
    }catch(err){
      toast.error("Error");
    }


  
  };

  return (
    <div>
      {/* <h1 className="bg-red-400 text-white text-4xl mt-36"> Profile Page </h1> */}
      {!isLoggedIn && <Navigate to="/" />}

      <div className="w-full max-w-full mt-36  border  rounded-lg shadow glassy-effect flex justify-center">
        <div className="flex flex-col mt-10 items-center justify-center   pb-10  ">
          <img
            className="md:w-52 md:h-44 h-20 w-20 md:ml-4 mb-3 rounded-full shadow-lg"
            src="/avatar.jpeg"
            alt={user?.name}
          />

          {/* <div className="flex justifmt-4 md:mt-6 "> */}
            <a
              onClick={logout}
              className="inline-flex items-center md:px-4 px-1 md:py-2 py-1 text-sm font-medium text-center text-white rounded-lg  focus:ring-4 focus:outline-none bg-red-500 hover:bg-red-600 focus:ring-red-300 cursor-pointer"
            >
              Logout
            </a>
          {/* </div> */}
        </div>
        <div className="flex flex-col  justify-center items-center mt-10 md:ml-10 ml-4  pb-10  ">
          <h5 className="mb-1 md:text-3xl text-center text-xl font-medium text-gray-900 dark:text-white">
            {user?.name}
          </h5>
          <span className="md:text-md text-sm text-gray-500 dark:text-gray-400">
            {user?.email}
          </span>
          {/* <div className="flex">
            <div className="m-5">
              <h5 className="mb-1 md:text-xl text-md font-medium text-gray-900 dark:text-white">
                Blogs
              </h5>
              <span className="md:text-xl text-md text-gray-500 dark:text-gray-400">
                0
              </span>
            </div>
            <div className="m-5">
              <h5 className="mb-1 md:text-xl text-md font-medium text-gray-900 dark:text-white">
                Notes
              </h5>
              <span className="md:text-xl text-md text-gray-500 dark:text-gray-400">
                0
              </span>
            </div>
          </div> */}
        </div>
      </div>

      <AddButton isLoggedIn={isLoggedIn} toggleLogin={toggleLogin} />
    </div>
  );
}
