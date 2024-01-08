import React, { useState, useEffect } from "react";
// import './Search.scss'
import { MdClose } from "react-icons/md";
import { client, urlFor } from "../../client";
import imageUrlBuilder from "@sanity/image-url";
import "./search.scss";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../../context/productDetail";
const builder = imageUrlBuilder(client);

const Search = ({ setShowSearch }) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [myProduct, setMyProduct] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Fetch all products from Sanity
      const query = '*[_type == "product"]';
      const products = await client.fetch(query);
      setMyProduct(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearch = async () => {
    // Wait for products to be fetched
    await fetchProducts();
    // Filter products based on the search input
    if (searchInput.trim() !== "") {
      const filteredProducts = myProduct.filter(
        (product) =>
          product.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          product.desc.toLowerCase().includes(searchInput.toLowerCase())
      );
      setSearchResults(filteredProducts);
    } else {
      // Clear search results if the search input is empty
      setSearchResults([]);
    }
  };

  const { setProductData } = useProductContext();

  const viewProduct = (productID, product) => {
    const productImage = product.image ? urlFor(product.image) : "";
    setProductData({
      productName: product.name,
      productImage: productImage,
      productPrice: product.price,
      productOldPrice: product.oldPrice,
      productDescription: product.desc,
      productCategory: product.category,
      productRating: product.star,
      productDiscount: product.discount,

      // Add other product data as needed
    });

    // Navigate to SingleProduct.js with the specific id
    navigate(`/product/${productID}`, { state: { productID } });
    setShowSearch(false);
  };
  const itemLength = searchResults.length;
  return (
    <div className="search-modals">
      <div className="form-fields">
        <input
          type="text"
          autoFocus
          placeholder="Search for products"
          onChange={(e) => {
            setSearchInput(e.target.value);
            handleSearch(); // Call handleSearch on each input change
          }}
        />

        <button onClick={() => setShowSearch(false)}>
          <MdClose size="35" />
        </button>
      </div>
      <div className="search-result-content">
          <div className="search-results">
            <div className="length w-full mb-1 pl-2">
              <span className="text-gray-500 text-[20px]">
                Found {itemLength} results
              </span>
            </div>
            {searchResults.map((product) => (
            <div
              className="product  hover:bg-gray-50 cursor-pointer"
              key={product._id}
              onClick={() => viewProduct(product._id, product)}
            >
              <div className="image-container ">
                <img
                  src={builder.image(product.image).url()}
                  alt={product.name}
                />
              </div>

              <div className=" details">
                <span className="name ">{product.name}</span>
                <span className="desc ">{product.desc}</span>
                <span className="">Category : {product.category}</span>
              </div>
            </div>
          ))}
          </div>
        </div>

      {/* <div className=" search-result-content">
        <div className=" Result ">
          <div className="length w-full mt-6">
            <span className="text-gray-500 text-[20px]">
              Found {itemLength} results related to '{searchInput}'
            </span>
          </div>
          {searchResults.map((product) => (
            <div
              className="product  hover:bg-gray-50 cursor-pointer"
              key={product._id}
              onClick={() => viewProduct(product._id, product)}
            >
              <div className="image-container ">
                <img
                  src={builder.image(product.image).url()}
                  alt={product.name}
                />
              </div>

              <div className=" details">
                <span className="name ">{product.name}</span>
                <span className="desc ">{product.desc}</span>
                <span className="">Category : {product.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Search;
