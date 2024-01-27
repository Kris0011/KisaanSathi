import React  from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import { Avatar } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import axios from "axios";


interface CustomNavLinkProps {
  to: string;
  className: string;
  activeClassName?: string;
  children: React.ReactNode;
}

const CustomNavLink: React.FC<CustomNavLinkProps> = ({
  to,
  className,
  activeClassName,
  children,
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <NavLink to={to} className={isActive ? activeClassName : className}>
      {children}
    </NavLink>
  );
};

export default function Nav({ toggleLogin, isLoggedIn , routes , user }: any) {


  // const toast = useToast();
  const dispatch = useDispatch();

  const {
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
    onClose: onCloseLogin,
  } = useDisclosure();
  const {
    isOpen: isOpenReg,
    onOpen: onOpenReg,
    onClose: onCloseReg,
  } = useDisclosure();

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
      <nav className="border-b border-gray-800 fixed w-full z-20 top-0 start-0   glassy-effect-navbar">
        <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto md:p-2 p-1">
          <CustomNavLink
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="/logo.png" className="md:h-12 h-6" alt="vite" />
          </CustomNavLink>
          <div className="flex md:order-2 space-x-3 md:space-x-0  rtl:space-x-reverse">
            {!isLoggedIn && (
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg md:text-sm text-sm md:px-4 md:py-2  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 px-2 "
                onClick={onOpenLogin}
              >
                Login/Register
                <Login
                  isOpen={isOpenLogin}
                  onClose={onCloseLogin}
                  onOpenRegister={onOpenReg}
                  toggleLogin={toggleLogin}
                />
                <Register
                  isOpen={isOpenReg}
                  onClose={onCloseReg}
                  onOpenLogin={onOpenLogin}
                />
              </button>
            )}
            {isLoggedIn && (
              <Menu>
                <MenuButton className="border-2 border-white-500 rounded-full">
                  <Avatar name="Dan Abrahmov" src={"/avatar.jpeg"} size={"sm"}/>
                </MenuButton>
                <MenuList bg={"gray.900"}>
                  <CustomNavLink
                    className=""
                    activeClassName="text-blue-400"
                    to="/profile"
                  >
                    <MenuItem bg={"gray.900"}>{user?.name}</MenuItem>
                  </CustomNavLink>
                  <MenuItem onClick={logout} bg={"gray.900"}>
                    <span className="text-red-500">Logout</span>
                  </MenuItem>
                </MenuList>
              </Menu>
            )}

            <div className="block md:hidden my-auto">
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<HamburgerIcon />}
                  // variant="outline"
                  bg={"gray.300"}
                  _hover={{
                    bg: "gray.400",
                  }}
                  _active={{
                    bg: "gray.500",
                  }}
                  _focus={{
                    bg: "gray.500",
                  }}
                  
                />
                <MenuList bg={"gray.900"}>
                  {routes.map((route: any, index: any) => (
                    <MenuItem key={index} bg={"gray.900"}>
                      <CustomNavLink
                        to={route.path}
                        className=""
                        activeClassName="text-blue-500"
                      >
                        {route.name}
                      </CustomNavLink>
                    </MenuItem>
                  ))}
                  
                </MenuList>
              </Menu>
            </div>
          </div>

          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 m">
              {routes.map((route: any, index: any) => (
                <li key={index}>
                  <CustomNavLink
                    to={route.path}
                    className="text-white hover:text-blue-400 font-semibold "
                    activeClassName="text-blue-400 font-semibold "
                  >
                    {route.name}
                  </CustomNavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}