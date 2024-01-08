import React, { useContext, useEffect, useState } from "react";
import Product from "../Products/Product/Product";
import "./Products.scss";
import { IoIosArrowDown } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import SameCategory from "../SingleProduct/RelatedProducts/SameCategory";
import { BrandFilterContext } from "../../context/BrandFilterContext";
const Products = ({
  filterProject,
  categoryName,
  ItemLength,
  handleChecked,
  isLoading,
  isRelated
}) => {
  const {ThisNumber} = useContext(BrandFilterContext)

  return (
    <div className="products-container">
      <div className=" productHeading ">
        <div className="section-heading">{categoryName}</div>
        <div className="displaying ">
          <span className="flex items-end justify-center gap-2">
            <span>Showing {ThisNumber} items</span>
            <IoIosArrowDown />
          </span>
          <div
            className=" ml-2
          xl3:hidden xl2:hidden xl1:hidden laptops:hidden  tablets:hidden
          mini-tablets:block
          "
          >
            <IoFilter size="25" onClick={handleChecked} />
          </div>
        </div>
      </div>
      <div className="products mt-5 w-full">

{isRelated ? 
  <SameCategory AllFilterProject={filterProject} isLoading={isLoading} />

:
<Product AllFilterProject={filterProject} isLoading={isLoading}/>

}
        
          
        
      </div>
    </div>
  );
};

export default Products;
