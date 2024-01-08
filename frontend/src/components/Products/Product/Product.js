import React, { useState, useEffect, useContext } from "react";
import earbuds from "../../../assets/products/earbuds-prod-1.webp";
import img1 from "../../../assets/items/img6-removebg-preview.png";
import "./Product.scss";
import { Link } from "react-router-dom";
import { client, urlFor } from "../../../client";
import { useProductContext } from "../../../context/productDetail";
import { useNavigate } from "react-router-dom";
import { BrandFilterContext } from "../../../context/BrandFilterContext";
const Product = ({ AllFilterProject }) => {
  const { setNumber } = useContext(BrandFilterContext);

  const navigate = useNavigate();
  const [displayedProducts, setDisplayedProducts] = useState(10);

  const handleLoadMore = () => {
    // Increase the number of displayed products by 8
    setDisplayedProducts((prevCount) => prevCount + 5);
  };
  useEffect(() => {
    setNumber(displayedProducts);
  }, [displayedProducts]);

  // const imageUrl = myProduct.length > 0 ? urlFor(myProduct[0].image) : null;

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
  };

  return (
    <>
    <div
      className="product-container grid grid-cols-5 gap-8 max-w-full items-center justify-center  
    xl3:grid-cols-5 xl2:grid-cols-5 xl1:grid-cols-4
    laptops:grid-cols-3 tablets:grid-cols-3
     mini-tablet:grid-cols-2 x560:grid-cols-2 
     x480:grid-cols-2 x392:grid-cols-1 x260:grid-cols-1
     x300:grid-cols-1 x392:gap-2 
    "
    >
      {AllFilterProject &&
        AllFilterProject.slice(0, displayedProducts).map((product) => (
          <div
            className="product max-w-full"
            onClick={() => viewProduct(product._id, product)}
            key={product._id}
          >
            <Link
              to={{
                pathname: `/product/${product._id}`,
              }}
              //  <Link to={`/product/${product._id}?productName=${product.name}&productImage=${urlFor(product.image)}&productPrice=${product.price}&productOldPrice=${product.OldPrice}&productDescription=${product.desc}`}
              className="category-1 r"
            >
              <div
                className="productImg relative 
              max-w-full h-[350px] x480:h-[250px] x392:h-[250px] x300:h-[250px] overflow:hidden
              "
              >
                <img
                  src={urlFor(product.image)}
                  alt=""
                
                  className="w-[200px] x480:w-[120px]
                  x392:w-[150px]
                  x300:w-[150px]
                  xl2:w-[170px] 
                  xl3:w-[190px]
                  xxl1:w-[180px]
                  laptops:w-[170px] 
                  tablets:w-[170px]
                  mini-tablet:w-[170px] 
                  x560:w-[170px]
                  
                  "
                />
                <span className="rating absolute bottom-1 text-[0.9rem] left-3">
                  {product.star} ★
                </span>
              </div>
              <div
                className="detail 
              h-[200px]  x480:h-[170px] x392:h-[170px] x300:h-[170px]
               pl-2 pr-2 "
               
              >
                <span className="font-bold">{product.name}</span>
                <p className="text-[#535665] line-clamp-3">{product.desc}</p>
                <h1 className="flex items-center buying  justify-between w-full">
                  ₹{product.price}{" "}
                  <s className="old-price text-[#96979e] text-[10px] ml-2 ">
                    ₹{product.oldPrice}
                  </s>{" "}
                  <span className="discount text-end w-full text-[12px] text-green-400">
                    {product.discount} off
                  </span>
                </h1>
              </div>
            </Link>
          </div>
        ))}
      
    </div>
    <LoadMore 
      AllFilterProject={AllFilterProject}
      displayedProducts={displayedProducts}
      handleLoadMore={handleLoadMore}
    />
    </>
  );
};

export default Product;
const LoadMore=({AllFilterProject,displayedProducts,handleLoadMore})=>{
return(
  AllFilterProject.length > displayedProducts && (
    <div className="load-more-btn ">
      <button onClick={handleLoadMore}>Show more</button>
    </div>
  )
)
}
