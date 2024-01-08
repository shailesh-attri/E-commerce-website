import React, { useContext, useEffect, useState } from "react";
import cat1 from "../../assets/category/cat-1.jpg";
import "./Category.scss";
import Products from "../Products/Products";
import { useParams, useLocation } from "react-router-dom";
import { client } from "../../client";
import Slider from "react-slider";
import { BrandFilterContext } from "../../context/BrandFilterContext";

// BrandFiltersPages
import { MobileBrandFilter } from "../../pages/BrandFilters";
import { CameraBrandFilter } from "../../pages/BrandFilters";
import { TabletsBrandFilter } from "../../pages/BrandFilters";
import { WatchBrandFilter } from "../../pages/BrandFilters";
import { HeadphonesBrandFilter } from "../../pages/BrandFilters";
import { LaptopsBrandFilter } from "../../pages/BrandFilters";

// React icons
import { RxCross1 } from "react-icons/rx";
const Category = () => {
  const location = useLocation();
  const {ThisBrand} = useContext(BrandFilterContext)
  const categoryName = location.state?.categoryName || "Default Category";
  console.log("SelectedBrand: ", ThisBrand);


  const [allProducts, setAllProducts] = useState([]);
  const [filterProject, setFilterProject] = useState([]);
  const [priceRange, setPriceRange] = useState([10, 500000]);
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("");

  // BrandName useState
  const [hasSmartphones, setSmartphones] = useState(false)
  const [hasCamera, setCamera] = useState(false)
  const [hasHeadphones, setHeadphones] = useState(false)
  const [hasLaptops, setLaptops] = useState(false)
  const [hasTablet, setTablet] = useState(false)
  const [hasWatch, setWatch] = useState(false)
  
  const BrandNames = ['Smartphones','Camera','Headphones','Laptops','Tablets','Watch']
  const BrandTypes = ['Daily Deals','SmartTV','Home Theater']
useEffect(()=>{

  if((BrandTypes[0] ||BrandTypes[1] || BrandTypes[2]) == categoryName){
    setSmartphones(false)
    setCamera(false)
    setHeadphones(false)
    setLaptops(false)
    setTablet(false)
    setWatch(false)
  }
  if(BrandNames[0] == categoryName){
    setSmartphones(true)
    setCamera(false)
    setHeadphones(false)
    setLaptops(false)
    setTablet(false)
    setWatch(false)
  }
  if(BrandNames[1]===categoryName)
  {
    setSmartphones(false)
    setCamera(true)
    setHeadphones(false)
    setLaptops(false)
    setTablet(false)
    setWatch(false)
  }
  if(BrandNames[2]===categoryName)
  {
    setSmartphones(false)
    setCamera(false)
    setHeadphones(true)
    setLaptops(false)
    setTablet(false)
    setWatch(false)
  }
  if(BrandNames[3]===categoryName)
  {
    setSmartphones(false)
    setCamera(false)
    setHeadphones(false)
    setLaptops(true)
    setTablet(false)
    setWatch(false)
  }
  if(BrandNames[4]===categoryName)
  {
    setSmartphones(false)
    setCamera(false)
    setHeadphones(false)
    setLaptops(false)
    setTablet(true)
    setWatch(false)
  }
  if(BrandNames[5]===categoryName)
  {
    setSmartphones(false)
    setCamera(false)
    setHeadphones(false)
    setLaptops(false)
    setTablet(false)
    setWatch(true)
  }
},[BrandNames,categoryName,BrandTypes])


  useEffect(() => {
    const query = '*[_type == "product"]';

      
    client.fetch(query).then((data) => {
      setAllProducts(data);
      setFilterProject(data);
    });
  }, []);

  const handleProjectFilter = () => {
    // Filter based on productCategory
    let filteredProducts = [];
    if (categoryName === "Daily Deals") {
      filteredProducts = allProducts;
    } else {
      filteredProducts = allProducts.filter((myProject) =>
        myProject.tags.includes(categoryName)
      );
    }
    

    // Filter based on price range
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    

    // Filter based on rating range
    // Filter based on selected rating
    if (selectedRating) {
      filteredProducts = filteredProducts.filter((product) => {
        const roundedRating = Math.floor(product.star);
        return roundedRating.toString() === selectedRating;
      });
    }
    

    // Sort based on price order
    if (selectedOrder === "Low to high") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else {
      filteredProducts.sort((a, b) => b.price - a.price);
    }
   
    // BrandFilter 
    if(ThisBrand){

      filteredProducts = filteredProducts.filter((product)=>product.name.toLowerCase().includes(ThisBrand.toLowerCase()))
      
    }
    console.log("Final Filter:",filteredProducts)
    // Log the filtered products to check if it's working as expected
    

    // Update the filtered products
    setFilterProject([...filteredProducts]); // Make sure to use spread syntax to create a new array
    
  };

  useEffect(() => {
    // Handle filtering when categoryName or allProducts change
    handleProjectFilter();
  }, [categoryName, allProducts, priceRange, selectedRating, selectedOrder,ThisBrand]);

  const ItemLength = filterProject.length;

  const [isChecked, setChecked] = useState(false)
  const handleChecked = ()=>{
    setChecked((prev)=>!prev)
    
  }
  const handleHeader = () => {
    const offset = window.scrollY;
    if (offset > 1000) {
      setChecked(false)
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleHeader);
  }, []);
  return (
    <div className="category-main-content">
      <div
        className="flex items-start justify-between gap-4
          xl3:flex-row xl2:flex-row xl1:flex-row laptops:flex-row      
          tablets:flex-col w-full
          mini-tablet:flex-col x560:flex-col x480:flex-col x392:flex-col x300:flex-col
          "
      >
        <div className="filtersContainer mt-[5rem]">
          <div
            className="filters flex flex-col items-center justify-center gap-[20px]
            xl3:flex-col xl2:flex-col xl1:flex-col laptops:flex-col       
            tablets:flex-row"
          >
            <h1 className="text-start font-bold text-[1rem]">Filters</h1>
            <div className="range-slider">
              <h1 className="filterLabel">Price Range</h1>
              <div className="">
                <div className="price-display w-[200px] flex items-center  justify-between ">
                  {/* Rs. {`${values[0]} - Rs. ${values[1]}`} */}
                  <span className="">₹ {`${priceRange[0]}`}</span>
                  <span className="">₹ {`${priceRange[1]}`}</span>
                </div>
                <Slider
                  className="slider"
                  onChange={setPriceRange}
                  value={priceRange}
                  min={10}
                  max={500000}
                ></Slider>
              </div>
            </div>
            <div className="orderWise flex flex-col items-start">
              <h1 className="pl-1 filterLabel">Price order</h1>
              <select
                name="priceOrder"
                id="priceOrder"
                onChange={(e) => setSelectedOrder(e.target.value)}
                value={selectedOrder}
              >
                <option value="">Mixed</option>
                <option value="Low to high">Low to high</option>
                <option value="High to low">High to low</option>
              </select>
            </div>
            <div className="ratingWise flex flex-col items-start">
              <h1 className="pl-1 filterLabel">Rating</h1>
              <select
                name="rating"
                id="rating"
                onChange={(e) => setSelectedRating(e.target.value)}
                value={selectedRating}
              >
                <option value="">All</option>
                <option value="5">5 star</option>
                <option value="4">4 star</option>
                <option value="3">3 star</option>
                <option value="2">2 star</option>
                <option value="1">1 star</option>
              </select>
            </div>
            {hasSmartphones && <MobileBrandFilter/>}
            {hasCamera && <CameraBrandFilter/>}
            {hasHeadphones && <HeadphonesBrandFilter/>}
            {hasLaptops && <LaptopsBrandFilter/>}
            {hasWatch && <WatchBrandFilter/>}
            {hasTablet && <TabletsBrandFilter/>}
            
            
          </div>
        </div>

        {/* Modal Filters */}
        {isChecked && 
        
        <div className="filtersContainerModal ">
          <div
            className="filters"
          >
          <div className="w-full flex items-center justify-between">
            <h1 className="text-start font-bold text-[1rem]">Filters</h1>
            <button onClick={()=>setChecked(!isChecked)}className="closeButton">
              <RxCross1/>
            </button>
          </div>
            <div className="range-slider">
              <h1 className="filterLabel">Price Range</h1>
              <div className="">
                <div className="price-display w-[200px] flex items-center  justify-between ">
                  {/* Rs. {`${values[0]} - Rs. ${values[1]}`} */}
                  <span className="">₹ {`${priceRange[0]}`}</span>
                  <span className="">₹ {`${priceRange[1]}`}</span>
                </div>
                <Slider
                  className="slider"
                  onChange={setPriceRange}
                  value={priceRange}
                  min={100}
                  max={500000}
                ></Slider>
              </div>
            </div>
            <div className="orderWise flex flex-col items-start">
              <h1 className="pl-1 filterLabel">Price order</h1>
              <select
                name="priceOrder"
                id="priceOrder"
                onChange={(e) => setSelectedOrder(e.target.value)}
                value={selectedOrder}
              >
                <option value="">Mixed</option>
                <option value="Low to high">Low to high</option>
                <option value="High to low">High to low</option>
              </select>
            </div>
            <div className="ratingWise flex flex-col items-start">
              <h1 className="pl-1 filterLabel">Rating</h1>
              <select
                name="rating"
                id="rating"
                onChange={(e) => setSelectedRating(e.target.value)}
                value={selectedRating}
              >
                <option value="">All</option>
                <option value="5">5 star</option>
                <option value="4">4 star</option>
                <option value="3">3 star</option>
                <option value="2">2 star</option>
                <option value="1">1 star</option>
              </select>
              
            </div>
            {hasSmartphones && <MobileBrandFilter/>}
            {hasCamera && <CameraBrandFilter/>}
            {hasHeadphones && <HeadphonesBrandFilter/>}
            {hasLaptops && <LaptopsBrandFilter/>}
            {hasWatch && <WatchBrandFilter/>}
            {hasTablet && <TabletsBrandFilter/>}
          </div>
          
        </div>
        }
       
        {/*  */}
        <div className="layout">
          <div className="flex items-end justify-between"></div>
          

           
           
          <Products
            ItemLength={ItemLength}
            filterProject={filterProject}
            categoryName={categoryName}
            handleChecked={handleChecked}
          ></Products>
        </div>
      </div>
    </div>
  );
};

export default Category;

