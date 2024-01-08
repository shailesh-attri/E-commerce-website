import React,{useState, useContext, useEffect} from "react"
import { BrandFilterContext } from "../context/BrandFilterContext"
export const MobileBrandFilter=()=>{
    const [selectedMobileBrand, setMobileBrand] = useState('')
    const {setBrand} = useContext(BrandFilterContext)
  
    useEffect(()=>{
      setBrand(selectedMobileBrand)
    },[selectedMobileBrand])
  
    return(
      <div className=" flex flex-col items-start">
                <h1 className="pl-1 filterLabel">Brand</h1>
                <select
                  name="brand"
                  id="brand"
                  onChange={(e) => setMobileBrand(e.target.value)}
                  value={selectedMobileBrand}
                >
                  <option value="">All</option>
                  <option value="Iphone">Iphone</option>
                  <option value="Samsung">Samsung</option>
                </select>
              </div>
    )
  }
  export const CameraBrandFilter=()=>{
    const [selectedCameraBrand, setCameraBrand] = useState('')
    const {setBrand} = useContext(BrandFilterContext)
  
    useEffect(()=>{
      setBrand(selectedCameraBrand)
    },[selectedCameraBrand])
      return(
        <div className="ratingWise flex flex-col items-start">
                  <h1 className="pl-1 filterLabel">Brand</h1>
                  <select
                    name="brand"
                    id="brand"
                    onChange={(e) => setCameraBrand(e.target.value)}
                    value={selectedCameraBrand}
                  >
                    <option value="">All</option>
                    <option value="Sony">Sony</option>
                    <option value="Nikon">Nikon</option>
                    <option value="Canon">Canon</option>
                    <option value="FujiFilm">FujiFilm</option>
                    
                  </select>
                </div>
      )
    }
    export const LaptopsBrandFilter=()=>{
        const [selectedLaptopBrand, setLaptopBrand] = useState('')
    const {setBrand} = useContext(BrandFilterContext)
  
    useEffect(()=>{
      setBrand(selectedLaptopBrand)
    },[selectedLaptopBrand])
      return(
        <div className="ratingWise flex flex-col items-start">
                  <h1 className="pl-1 filterLabel">Brand</h1>
                  <select
                    name="brand"
                    id="brand"
                    onChange={(e) => setLaptopBrand(e.target.value)}
                    value={selectedLaptopBrand}
                  >
                    <option value="">All</option>
                    <option value="Lenovo">Lenovo</option>
                    <option value="Dell">Dell</option>
                    <option value="Apple">Apple</option>
                  </select>
                </div>
      )
    }
    export const HeadphonesBrandFilter=()=>{
        const [selectedHeadphonesBrand, setHeadphonesBrand] = useState('')
    const {setBrand} = useContext(BrandFilterContext)
  
    useEffect(()=>{
      setBrand(selectedHeadphonesBrand)
    },[selectedHeadphonesBrand])
      return(
        <div className="ratingWise flex flex-col items-start">
                  <h1 className="pl-1 filterLabel">Brand</h1>
                  <select
                    name="brand"
                    id="brand"
                    onChange={(e) => setHeadphonesBrand(e.target.value)}
                    value={selectedHeadphonesBrand}
                  >
                    <option value="">All</option>
                    <option value="Headset">Headset</option>
                    <option value="Earbuds">Earbuds</option>
                    <option value="JBL">JBL</option>
                    <option value="Boult">Boult</option>
                  </select>
                </div>
      )
    }
    export const TabletsBrandFilter=()=>{
        const [selectedTabletBrand, setTabletBrand] = useState('')
    const {setBrand} = useContext(BrandFilterContext)
  
    useEffect(()=>{
      setBrand(selectedTabletBrand)
    },[selectedTabletBrand])
      return(
        <div className="ratingWise flex flex-col items-start">
                  <h1 className="pl-1 filterLabel">Brand</h1>
                  <select
                    name="brand"
                    id="brand"
                    onChange={(e) => setTabletBrand(e.target.value)}
                    value={selectedTabletBrand}
                  >
                    <option value="">All</option>
                    <option value="Ipad">Ipad</option>
                    <option value="Samsung">Samsung</option>
                  </select>
                </div>
      )
    }
   
    export const WatchBrandFilter=()=>{
        const [selectedWatchBrand, setWatchBrand] = useState('')
    const {setBrand} = useContext(BrandFilterContext)
  
    useEffect(()=>{
      setBrand(selectedWatchBrand)
    },[selectedWatchBrand])
      return(
        <div className="ratingWise flex flex-col items-start">
                  <h1 className="pl-1 filterLabel">Brand</h1>
                  <select
                    name="brand"
                    id="brand"
                    onChange={(e) => setWatchBrand(e.target.value)}
                    value={selectedWatchBrand}
                  >
                    <option value="">All</option>
                    <option value="Analog">Analog</option>
                    <option value="Smartwatch">Smartwatch</option>
                    <option value="Noise">Noise</option>
                    <option value="Fastrack">Fastrack</option>
                    <option value="Realme">Realme</option>
                  </select>
                </div>
      )
    }
   