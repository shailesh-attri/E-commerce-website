import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import "./CartItem.scss";
import { RiDeleteBin5Line } from "react-icons/ri";
import img1 from "../../../assets/items/img1-removebg-preview.png";

const CartItem = ({
  cartItem,
  removeFromCartItems,
  handleCartProductQuantity,
}) => {
  const [itemCount, setItemCount] = useState(cartItem.Value);

  const IncCount = () => {
    setItemCount(itemCount + 1);
  };

  const DecCount = () => {
    // Ensure the count does not go below 1
    const newCount = Math.max(1, itemCount - 1);
    setItemCount(newCount);
  };

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value, 10);
    console.log("New value:", value);
    setItemCount(isNaN(value) ? 0 : value);
  };

  return (
    <div className="cart-products">
      <div className="search-result-item">
        <div className="image-container">
          <img src={cartItem.productImage} />
        </div>
        <div className="prod-details w-full">
          <span className="name">{cartItem.productName}</span>
          <RiDeleteBin5Line
            size="20"
            className="close-btn text-end"
            onClick={() => removeFromCartItems(cartItem.productName)}
          />
          <div className="quantity-buttons">
            <span
              onClick={() => {
                handleCartProductQuantity("dec", cartItem);
                DecCount();
              }}
            >
              -
            </span>
            <span className="quantity">{itemCount}</span>
            <span
              onClick={() => {
                handleCartProductQuantity("inc", cartItem);
                setItemCount(itemCount + 1);
              }}
            >
              +
            </span>
          </div>
          <div className="text flex items-center justify-between">
            <span>₹{cartItem.productPrice}</span>

            <span className="highlight">
              <span>
                &#8377;{itemCount} x {itemCount * cartItem.productPrice}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
