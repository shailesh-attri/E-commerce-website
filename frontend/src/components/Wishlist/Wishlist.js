import React, { useState, useEffect, useContext } from "react";
import "./Wishlist.scss";
import { MdClose } from "react-icons/md";
import img1 from "../../assets/items/img4-removebg-preview.png";
import { FaShoppingCart } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import localforage from "localforage";
import { useWishlist } from "../../context/Wishlist-Cart";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { useProductContext } from "../../context/productDetail";
import { client, urlFor } from "../../client";
import { useNavigate } from "react-router-dom";
import { SingleProductContext } from "../../context/ProductContext";
// const builder = imageUrlBuilder(client);
const Wishlist = ({ setShowWishlist, handleAddToCartList }) => {
  const { wishlistItems, removeFromWishlist, updateWishlistCount } =
    useWishlist();
  const [isEmpty, setIsEmpty] = useState(wishlistItems.length === 0);
  const [myProduct, setMyProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Update isEmpty state when wishlistItems changes
    setIsEmpty(wishlistItems.length === 0);
  }, [wishlistItems]);

  const { setProduct } = useContext(SingleProductContext);
  const { setProductData } = useProductContext();

  const addToWishlist = (
    productName,
    productImage,
    productPrice,
    productOldPrice,
    productRating,
    productDiscount
  ) => {
    // Check if the item is not already in the wishlist
    const isAlreadyInWishlist = wishlistItems.some(
      (item) =>
        item.productName === productName &&
        item.productImage === productImage &&
        item.productPrice === productPrice &&
        item.productOldPrice === productOldPrice &&
        item.productRating === productDiscount &&
        item.productDiscount === productRating
    );

    if (!isAlreadyInWishlist) {
      // Update the local storage
      const updatedWishlist = [
        ...wishlistItems,
        {
          productName,
          productImage,
          productPrice,
          productOldPrice,
          productDiscount,
          productRating,
        },
      ];
      localforage.setItem("wishlistItems", updatedWishlist);

      // Update the wishlist count
      updateWishlistCount(updatedWishlist.length);
    }
  };

  const SeeProductDetails = (productId, product) => {
    console.log("Product details:", product);

    const productImage = product.productImage
      ? urlFor(product.productImage)
      : "";
    setProductData({
      productName: product.productName,
      productImage: productImage,
      productPrice: product.productPrice,
      productOldPrice: product.productOldPrice,
      productDescription: product.productDescription,
      productCategory: product.productCategory,
      productDiscount: product.productDiscount,
      productRating: product.productRating,

      // Add other product data as needed
    });

    navigate(`/product/${productId}`, { state: { productId } });
    setShowWishlist(false);
  };
  const wishlistItemsLength = wishlistItems.length;

  return (
    <div className="search-modal">
      <div className="form-field">
        <h1 className="">Your Wishlist</h1>
        <MdClose className="close-btn" onClick={() => setShowWishlist(false)} />
      </div>
      {isEmpty ? (
        <div className="EmptyWishlist">
          <div className="container">
            <MdFormatListBulletedAdd className="icon" />
            <h1>Your Wishlist is empty</h1>
          </div>
        </div>
      ) : (
        <div className="search-result-content">
          <div className="search-results">
            <div className="length w-full mt-0">
              <span className="text-gray-500 text-[20px]">
                Showing {wishlistItemsLength} items{" "}
              </span>
            </div>
            {wishlistItems.map((product) => (
              <div className="search-result-item" key={product._id}>
                <div className="image-container">
                  <img src={product.productImage} alt="" />
                </div>
                <div className="prod-details ">
                  <div className="Title-Delete flex items-center justify-between w-full">
                    <h1 className="text-gray-900  title-font font-medium mb-1 wishListItem">
                      {product.productName}
                    </h1>
                    <RiDeleteBin5Line
                      size="25"
                      onClick={() => removeFromWishlist(product.productName)}
                    />
                  </div>
                  <p className="leading-relaxed text-gray-400 line-clamp-2 Describe">
                    {product.productDescription}
                  </p>
                  <div className="price flex items-center justify-between w-full">
                    <div className="PriceContainer">
                      <span className="title-font font-medium  text-gray-900">
                        ₹{product.productPrice}
                      </span>
                      <s className="old-price text-[#96979e]  ml-2 ">
                        ₹{product.productOldPrice}
                      </s>{" "}
                    </div>
                    <div className="purchase-btn flex items-center justify-start gap-[30px]">
                      <button
                        onClick={() => SeeProductDetails(product._id, product)}
                        className="flex items-center gap-[10px] justify-center ml-auto text-white bg-gray-800 border-0 py-1 px-2 focus:outline-none hover:bg-indigo-600 rounded"
                      >
                      <span className="ViewProduct"> View product</span>
                      <span className="view">View</span>
                       
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
