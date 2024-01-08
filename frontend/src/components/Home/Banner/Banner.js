import React, { useState, useEffect, useContext } from "react";

import { client, urlFor } from "../../../client";
import { useNavigate } from "react-router-dom";
import { SingleProductContext } from "../../../context/ProductContext";
import { useProductContext } from "../../../context/productDetail";
import "./Banner.scss";
import { useWishlist } from "../../../context/Wishlist-Cart";
import { ToastContainer, toast } from "react-toastify";
import MoonLoader from 'react-spinners/MoonLoader'
import "react-toastify/dist/ReactToastify.css";
const Banner = () => {
  const [bannerData, setBannerData] = useState([]);
  const { setProductData,selectedProduct } = useProductContext()
  const {addToCartList,cartItems} = useWishlist()
  const navigate = useNavigate();
 

  useEffect(() => {
    const query = '*[_type == "banner"]';

    client.fetch(query).then((data) => {
      setBannerData(data);
    });
  }, []);

  const Banner = bannerData.length > 0 ? bannerData[0] : null;
  const imageUrl = Banner && Banner.image ? urlFor(Banner.image) : null;

  if (!Banner) {
    return (
      <div className="w-full h-screen flex items-center justify-center head-text bg-white ">
        <span className="flex flex-col items-center justify-center gap-4"><MoonLoader color="#36d7b7" /><span className="">Loading ...</span></span>
      </div>
    );
  }
  const bannerImage =Banner && Banner.image ? urlFor(Banner.image) : null;
  const count = 1
  const bannerProduct = {
    productName:Banner.product,
    productImage:bannerImage,
    productPrice:Banner.price,
    productOldPrice:Banner.oldPrice,
    productDescription:Banner.desc,
    productCategory:Banner.category,
    Value:count
    // Add other product data as needed
  }
  const handleView = (BannerId) => {
    

    setProductData(bannerProduct);

    // Navigate to SingleProduct.js with the specific id
    navigate(`/product/${BannerId}`, { state: { BannerId } });
  };

  // BiyNow
 
  
  return (
    <div className="mx-auto heroContainer  xl1:px-0   bg-gray-200">
      <div className="bannerContainer  bg-gray-50 ">
        <div className="DiscountBanner r bg-gray-800 ">
          <p className="transform flex flex-shrink-0 -rotate-90 text-2xl font-semibold tracking-wide leading-normal text-white">
            {Banner.discount} OFF
          </p>
        </div>
        <div className="flex justify-center items-start flex-col xl1:w-2/5 tablets:w-5/12 xl1:px-7 px-6 tablets:px-0 tablets:py-0 py-5">
          <div>
            <p className="text-3xl xl1:text-4xl font-semibold leading-9 text-gray-800">
              Act before it’s too late!
            </p>
          </div>
          <div className="xl:mt-4 mt-2">
            <p className="text-base xl1:text-xl leading-7 text-gray-600 pr-4">
              Headphone that looks modern and is comfortable as well. Avail the{" "}
              {Banner.discount} offer now.
            </p>
          </div>

          <div className="buttons flex items-center justify-center gap-5 mt-7">
            <button
              onClick={()=>handleView(Banner._id,Banner)}
              className="button is-primary is-outlined bg-black px-4  py-2 text-white hover:bg-black/80 transition-all"
            >
              Read more
            </button>
           
          </div>
        </div>
        <div className="hidden tablets:block h-44 tablets:h-30 xl1:h-72">
          {imageUrl && (
            <img
              className="hidden h-full xl1:block"
              src={imageUrl}
              alt="pexels-dmitry-zvolskiy-2082090-1"
            />
          )}{" "}
          {imageUrl && (
            <img
              className="xl1:hidden h-full"
              src={imageUrl}
              alt="pexels-dmitry-zvolskiy-2082090-1-1"
            />
          )}
        </div>
      </div>
      <div className="tablets:hidden mt-6 w-full">
        {imageUrl && <img src={imageUrl} alt="" />}
      </div>
    </div>
  );
};

export default Banner;
