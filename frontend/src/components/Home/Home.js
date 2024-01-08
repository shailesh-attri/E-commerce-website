import React, { useState, useEffect } from "react";
import "./Home.scss";

import Banner from "./Banner/Banner";

import Products from "../Products/Products";

import { client } from "../../client";
const Home = () => {
  const [filterProject, setFilterProject] = useState([]);
  

  useEffect(() => {
    const query = '*[_type == "product"]';

    client.fetch(query).then((data) => {
      setFilterProject(data);
    });
  }, []);
  const itemLength = filterProject.length;
  return (
    <div>
      <Banner />
      <div className="main-content">
        <div className="layout">
          <Products
            categoryName={"Daily deals"}
            ItemLength={itemLength}
            filterProject={filterProject}
          />
        </div>
      </div>



      

    </div>
  );
};

export default Home;
