import React, { useState, useEffect, useContext } from "react";
import img1 from "../../assets/items/img4-removebg-preview.png";
import { FaShoppingCart } from "react-icons/fa";
import "./SingleProduct.scss";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import { useWishlist } from "../../context/Wishlist-Cart";
import Cart from "../Cart/Cart";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SingleProductContext } from "../../context/ProductContext";
import { useProductContext } from "../../context/productDetail";
import { client } from "../../client";
const SingleProduct = () => {
  const [count, setCount] = useState(1);
  const [ShowCartList, setShowCartList] = useState(false);
  const IncCount = () => {
    setCount(count + 1);
  };

  const DecCount = () => {
    // Ensure the count does not go below 1
    setCount((prevCount) => Math.max(1, prevCount - 1));
  };

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setCount(isNaN(value) ? 0 : value);
  };
  const { wishlistItems, addToWishlist } = useWishlist();

  const handleAddToWishlist = () => {
    const product = {
      productName: selectedProduct.productName,
      productImage: selectedProduct.productImage,
      productPrice: selectedProduct.productPrice,
      productOldPrice: selectedProduct.productOldPrice,
      productDescription: selectedProduct.productDescription,
      productCategory: selectedProduct.productCategory,
      productRating:selectedProduct.productRating,
      productDiscount:selectedProduct.productDiscount
      // ... other product details ...
    };

    // Check if the item is not already in the wishlist
    const isAlreadyInWishlist = wishlistItems.some(
      (item) =>
        item.productName === product.productName &&
        item.productImage === product.productImage &&
        item.productPrice === product.productPrice &&
        item.productOldPrice === product.productOldPrice &&
        item.productDescription === product.productDescription &&
        item.productCategory === product.productCategory &&
        item.productDiscount === product.productDiscount &&
        item.productRating === product.productRating
      // ... add other checks for additional product details ...
    );

    if (!isAlreadyInWishlist) {
      addToWishlist(product);
      toast.success("Item added to the Wishlist");
    } else {
      toast.error("Item already added into Wishlist");
    }
  };
  const { cartItems, addToCartList } = useWishlist();
  const handleAddToCartList = () => {
    if (selectedProduct) {
      const product = {
        productName: selectedProduct.productName,
        productImage: selectedProduct.productImage,
        productPrice: selectedProduct.productPrice,
        productOldPrice: selectedProduct.productOldPrice,
        Value: count,
        // ... other product details ...
      };

      // Check if the item is not already in the wishlist
      const isAlreadyInWishlist = cartItems.some(
        (item) =>
          item.productName === product.productName &&
          item.productImage === product.productImage &&
          item.productPrice === product.productPrice &&
          item.productOldPrice === product.productOldPrice
        // ... add other checks for additional product details ...
      );

      if (!isAlreadyInWishlist) {
        addToCartList(product);
        toast.success("Item added to the cart");
      } else {
        toast.error("Item already added into Cartlist");
      }
    }
  };

  const BuyNow = () => {
    handleAddToCartList();
    setShowCartList(true);
  };

  const AddToCart = () => {
    handleAddToCartList();
    setCount(1);
  };
  const { ThisProduct } = useContext(SingleProductContext);
  const { selectedProduct } = useProductContext();
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const {
    productName,
    productImage,
    productPrice,
    productOldPrice,
    productDescription,
    productCategory,
    productDiscount,
    productRating
    // Add other product data fields as needed
  } = selectedProduct || ThisProduct || {};
  console.log("Thisproduct", ThisProduct);
  useEffect(() => {
    // Fetch product details based on the 'id'
    const fetchProductDetails = async () => {
      try {
        const productDetails = await client.fetch(
          `*[_type == "product" && _id == "${id}"]`
        );
        if (productDetails && productDetails.length > 0) {
          setProduct(productDetails[0]);
        } else {
          // Handle the case where the product with the given 'id' is not found
          console.error(`Product with ID ${id} not found.`);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on component mount
  }, []);

  const [allProducts, setAllProducts] = useState([]);
  const [filterProject, setFilterProject] = useState([]);
  useEffect(() => {
    const query = '*[_type == "product"]';

    client.fetch(query).then((data) => {
      setAllProducts(data);
      setFilterProject(data);
    });
  }, []);

  const handleProjectFilter = () => {
    // Assuming 'allProducts' is defined before this setTimeout
    const selectedFilter = productCategory;
    console.log("Selected Category: ", productCategory);
    console.log("Selected Filter Category: ", selectedFilter);

    // Now, filter again based on productCategory
    setFilterProject(
      allProducts.filter((myProject) => myProject.tags.includes(selectedFilter))
    );
  };

  useEffect(() => {
    handleProjectFilter();
  }, [productCategory, allProducts]);

  // Log the updated state inside the useEffect

  return (
    <section className="text-gray-600 body-font overflow-hidden main_product">
      <div className="container px-5 laptops:px-2 tablets:px-0 x480:px-2 x392:px-1 x300:px-1 py-6 mx-auto">
        <div
          className=" w-4/5 laptops:w-full
        xl1:flex-row xl1:w-4/5 xl2:w-4/5 xl3:w-4/5 xl2:flex-row xl3:flex-row laptops:flex-row   
        tablets:flex-col mini-tablet:flex-col x560:flex-col 
        x480:flex-col x392:flex-col x300:flex-col x260:flex-col
        x480:w-full
        x392:w-full
        x300:w-full
         mx-auto flex items-center justify-around"
        >
          <div className="ProductImg">
            <img
              alt="ecommerce"
              className="laptops:w-1/2 w-full laptops:h-auto 
              tablets:h-auto 
              mini-tablet:h-auto 
              x560:h-auto 
              x480:h-auto 
              x392:h-auto 
              x300:h-auto 
              x260:h-auto 
              h-64 object-cover  object-center rounded"
              src={productImage}
            />
          </div>
          <div className="ProductContainer laptops:w-1/2 w-full laptops:pl-10 laptops:py-6 mt-6 laptops:mt-0">
            <h1 className="text-gray-600 text-lg  mb-1">
              {productName}
            </h1>
            
            <p className=" text-gray-400">{productDescription}</p>
            <div className="rating flex items-center justify-between py-2 text-[20px]">
              <span className="text-gray-600">{productRating} star rating</span>
              <span className="text-green-400">{productDiscount} off</span>
            </div>
            <div className="CountSection mt-1  
           
            pb-3 border-b-2 border-gray-100 mb-3">
            
              <div className="flex ItemCount x300:w-full">
                <button className="" onClick={DecCount}>
                  -
                </button>
                <input
                  type="text"
                  className="inputCount"
                  value={count}
                  onChange={handleInputChange}
                />
                <button className="" onClick={IncCount}>
                  +
                </button>
              </div>
              <button
                  onClick={AddToCart}
                  className="flex items-center gap-[10px] 
                  justify-center ml-auto text-white bg-[ bg-[#8e2de2] 
                  x300:px-4 x260:px-4 x300:text-center x300:w-full
                  border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                >
                  {" "}
                  <FaShoppingCart class /> Add to Cart
                </button>
            </div>
            <div className="flex items-center justify-between
            x300:flex-col gap-2
             pb-5 border-b-2 border-gray-100 mb-5">
              <div className="x300:w-full x300:flex x300:justify-between x300:items-center">
                <span className="title-font font-medium text-xl text-gray-900">
                  ₹{productPrice}
                </span>
                <s className="old-price text-[#96979e] text-[15px] ml-2 ">
                  ₹{productOldPrice}
                </s>{" "}
              </div>

              <div className="w-full">
                
                <button
                onClick={BuyNow}
                className="flex ml-auto text-white bg-[#8e2de2]
                 border-0 py-2 px-6 focus:outline-none 
                 x300:px-4 x260:px-4 x300:w-full x300:text-center x300:justify-center
                 hover:bg-indigo-600 rounded"
              >
                Buy now
              </button>
                
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <h2 className="text-[20px]">Category: {productCategory}</h2>
              <button
                onClick={handleAddToWishlist}
                className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
              >
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
              
            </div>
          </div>
        </div>
      </div>
      <RelatedProducts filterProject={filterProject}></RelatedProducts>
      {ShowCartList && <Cart setShowCartList={setShowCartList} />}
    </section>
  );
};

export default SingleProduct;
