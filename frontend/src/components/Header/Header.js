import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { storage, auth } from "../../firebase";

import { TbSearch } from "react-icons/tb";
import { GiShoppingCart } from "react-icons/gi";
import Cart from "../Cart/Cart";
import "./Header.scss";
import Search from "../Header-Search/Search";

import Wishlist from "../Wishlist/Wishlist";
import logo from "../../assets/logo.png";
import logoTitle from "../../assets/logoimg.png";

import { IoMdHeartEmpty } from "react-icons/io";
import { useWishlist } from "../../context/Wishlist-Cart";
import { FaRegUser } from "react-icons/fa";
import { useAuthState } from "react-firebase-hooks/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SignIn from "../../pages/SignIn";
import Signup from "../../pages/Signup";
import { IoIosArrowDown } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { Sidenav, initTE } from "tw-elements";
import { RxCross1 } from "react-icons/rx";

initTE({ Sidenav });
const categories = [
  "Daily Deals",
  "Smartphones",
  "Laptops",
  "Camera",
  "Watch",
  "Headphones",
  "SmartTV",
  "Tablets",
  "Home Theater",
];

const Header = () => {
  const [showWishlist, setShowWishlist] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const { wishlistItems } = useWishlist();
  const { cartItems } = useWishlist();
  const [user] = useAuthState(auth);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const [isVisible, setVisible] = useState(false);

  const handleSidebar = () => {
    setVisible((prev) => !prev);
  };

  const handleShowCart = (data) => {
    setShowCart(data);
  };

  const handleHeader = () => {
    const offset = window.scrollY;
    if (offset > 0) {
      setIsScrolled(true);
      setShowModal(false);
      setDropdownOpen(false);
      setVisible(false);
    } else {
      setIsScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleHeader);
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setShowModal(false);
      toast.success(`You have successfully logged out!`);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const navigate = useNavigate();
  const handleCategory = (category) => {
    navigate(`/category/${category.toLowerCase()}`, {
      state: { categoryName: category },
    });
  };

  const dpImage = user?.photoURL;
  return (
    <>
      <ToastContainer position="top-left" autoClose={2000} />
      <header className={`main-header ${isScrolled ? "sticky-header" : ""} `}>
        <div className="header-content">
          <div className="flex items-center justify-center gap-2">
            <button className="toggle" onClick={handleSidebar}>
              <RxHamburgerMenu size={30} />
            </button>
            <button className="logoDiv " onClick={()=>navigate('/')}>
              <img src={logoTitle} alt="" className="logoImg" />
         
            </button>
          </div>
          <ul>
            <button onClick={()=>navigate('/')}>Home</button>
           
            <li
              onMouseEnter={toggleDropdown}
              onMouseLeave={toggleDropdown}
              className="category flex justify-center items-end gap-2"
            >
              <span className="">Categories</span> <IoIosArrowDown />
              {isDropdownOpen && (
                <ul className="dropdown">
                  {categories.map((category, index) => (
                    <li key={index} onClick={() => handleCategory(category)}>
                      <button >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <button onClick={()=>navigate('/footer')}>Contact</button>
          </ul>
          <div className="cart-search">
            <TbSearch
              size={25}
              className=" cursor-pointer"
              onClick={() => setShowSearch(true)}
            />
            <span
              className="cart relative"
              onClick={() => setShowWishlist(true)}
            >
              <IoMdHeartEmpty size={25} className=" cursor-pointer" />
              {wishlistItems.length > 0 && (
                <span className="wishlist-count cursor-pointer">
                  {wishlistItems.length}
                </span>
              )}
            </span>

            <span
              className="cart relative"
              onClick={() => setShowCart((prev) => !prev)}
            >
              <GiShoppingCart size={30} className="CartIcon cursor-pointer" />
              {cartItems.length > 0 && (
                <span className="cart-count cursor-pointer">
                  {cartItems.length}
                </span>
              )}
            </span>
            {user ? (
              <div
                className="profileImg"
                onClick={() => setShowModal((prev) => !prev)}
              >
                <img
                  src={user.photoURL}
                  alt=""
                  className="border-2 rounded cursor-pointer"
                />
              </div>
            ) : (
              <FaRegUser
                size={23}
                onClick={() => setShowModal((prev) => !prev)}
                className="cursor-pointer"
              />
            )}
          </div>
        </div>

        {user ? (
          <>
            <div className={showModal ? "LoginModal" : "hidden"}>
              <h1 className="SignIn text-center text-[25px] font-bold">
                UserProfile
              </h1>
              <div className="flex flex-col items-center justify-center btns overflow-hidden">
                <img
                  src={user?.photoURL}
                  alt="dp"
                  className="border-2 rounded border-black"
                />
                <span className="">Name : {user?.displayName}</span>
                <span className="line-clamp-1 ">Email:{user?.email}</span>

                <button className="" onClick={handleLogout}>
                  Sign out
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className={showModal ? "LoginModal" : "hidden"}>
            <h1 className="SignIn text-center text-[25px] font-bold">
              Sign in or Create an Account
            </h1>
            <div className="flex flex-col items-center justify-center btns">
              <button
                className=""
                onClick={() => {
                  setShowLoginModal(true);
                  setShowSignupModal(false);
                  setShowModal(false);
                }}
              >
                Sign in
              </button>
              <button
                className=""
                onClick={() => {
                  setShowLoginModal(false);
                  setShowSignupModal(true);
                  setShowModal(false);
                }}
              >
                Create account
              </button>
            </div>
          </div>
        )}
      </header>

      {isVisible && (
        <Sidebar
          isVisible={isVisible}
          onClickCategory={handleCategory}
          handleSidebar={handleSidebar}
          dpImage={dpImage}
          handleLogout={handleLogout}
          setShowLoginModal={setShowLoginModal}
        />
      )}
      {showLoginModal && <SignIn setShowLoginModal={setShowLoginModal} />}
      {showSignupModal && <Signup setShowSignupModal={setShowSignupModal} />}

      {showCart && <Cart setShowCartList={handleShowCart} />}
      {showSearch && <Search setShowSearch={setShowSearch} />}
      {showWishlist && <Wishlist setShowWishlist={setShowWishlist} />}
    </>
  );
};

export default Header;

const Sidebar = ({
  isVisible,
  onClickCategory,
  handleSidebar,
  dpImage,
  handleLogout,
  setShowLoginModal,
}) => {
  const [isLogin, setLogin] = useState(false);
  const [user] = useAuthState(auth);
  const handleSignOut = () => {
    handleLogout();
    setLogin((prev) => !prev);
  };
  const handleSignIn = () => {
    handleLogout();
    setLogin((prev) => !prev);
    setShowLoginModal(true);
    handleSidebar(false);
  };
  const handleCategory = (category) => {
    onClickCategory(category);
    handleSidebar(false);
  };
  const navigate = useNavigate();

  return (
    isVisible && (
      <nav
        id="sidenav-1"
        class="fixed left-0 top-0 z-[1035] h-full max-w-full -translate-x-full overflow-hidden   data-[te-sidenav-hidden='false']:translate-x-0 
    flex flex-col justify-between items-start"
        data-te-sidenav-init
        data-te-sidenav-hidden="false"
        data-te-sidenav-position="absolute"
      >
        <ul
          class="relative m-0 list-none px-[0rem]  w-full"
          data-te-sidenav-menu-ref
        >
          <li class="relative flex items-center justify-between ">
            <a
              class="flex h-12 cursor-pointer items-center truncate rounded-[5px] py-4 text-[0.875rem]  outline-none transition duration-300 ease-linear  hover:text-inherit hover:outline-none focus:text-inherit focus:outline-none  active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none  "
              data-te-sidenav-link-ref
              href="#"
            >
              {user ? (
                <div className="profileImg flex items-center justify-center gap-4 ">
                  <img
                    src={dpImage}
                    alt=""
                    className=" rounded-3xl  cursor-pointer w-[40px] h-[40px]"
                  />
                  <span className="">{user?.displayName}</span>
                </div>
                
              ) : (
                <FaRegUser size={23} className="cursor-pointer" />
              )}
            </a>
            
            <RxCross1
              color="black"
              size={25}
              className="mr-0
        "
              onClick={() => handleSidebar(false)}
            />
          </li>
          <span className="px-4 ">Email: {user?.email}</span>
          <li class="relative">
            <button
              class="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-4 py-4 text-[20px]  outline-none transition duration-300 ease-linear hover:text-inherit hover:outline-none focus:text-inherit focus:outline-none  active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none "
              data-te-sidenav-link-ref
              onClick={() => {
                navigate("/");
                handleSidebar(false);
              }}
            >
              <span class="mr-4 [&>svg]:h-4 [&>svg]:w-4 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="h-4 w-4"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              <span>Home </span>
              <span
                class="absolute right-0  mr-[0.8rem] transition-transform duration-300 ease-linear motion-reduce:transition-none "
                data-te-sidenav-rotate-icon-ref
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="h-5 w-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </button>
            <a
              class="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-4 py-4 text-[20px]  outline-none transition duration-300 ease-linear hover:text-inherit hover:outline-none focus:text-inherit focus:outline-none  active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none "
              data-te-sidenav-link-ref
            >
              <span class="mr-4 [&>svg]:h-4 [&>svg]:w-4 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="h-4 w-4"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              <span>Category </span>
              <span
                class="absolute right-0  mr-[0.8rem] transition-transform duration-300 ease-linear motion-reduce:transition-none "
                data-te-sidenav-rotate-icon-ref
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="h-5 w-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </a>
            <ul
              class="!visible relative m-0 list-none  p-0 gap-2 flex flex-col items-start justify-center"
              data-te-sidenav-collapse-ref
              data-te-collapse-show
            >
              {categories.map((category, index) => (
                <li class="relative CategoryItem  w-full " key={index}>
                  <button
                    onClick={() => handleCategory(category)}
                    class=" w-full text-[20px] flex h-6 cursor-pointer items-center justify-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 gap-2  outline-none transition duration-300 ease-linear hover:text-inherit hover:outline-none  focus:text-inherit focus:outline-none  active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-non"
                    data-te-sidenav-link-ref
                  >
                    <span className="text-start  w-[150px]">{category}</span>
                  </button>
                </li>
              ))}
            </ul>
            <button
          class="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-4 py-4 text-[20px]  outline-none transition duration-300 ease-linear hover:text-inherit hover:outline-none focus:text-inherit focus:outline-none  active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none "
          data-te-sidenav-link-ref
                onClick={()=>{
                  navigate('/footer')
                  handleSidebar(false)}}
        >
          <span class="mr-4 [&>svg]:h-4 [&>svg]:w-4 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="h-4 w-4"
            >
              <path
                fill-rule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          <span>Contact </span>
          <span
            class="absolute right-0  mr-[0.8rem] transition-transform duration-300 ease-linear motion-reduce:transition-none "
            data-te-sidenav-rotate-icon-ref
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="h-5 w-5"
            >
              <path
                fill-rule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </button>
          </li>
        </ul>
        {isLogin ? (
          <button
            className="signout bg-black text-white w-full p-3 text-[1rem]"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        ) : (
          
          <button
            className="signout bg-black text-white w-full p-3 text-[1rem]"
            onClick={handleSignIn}
          >
            Sign in
          </button>
        )}
      </nav>
    )
  );
};
