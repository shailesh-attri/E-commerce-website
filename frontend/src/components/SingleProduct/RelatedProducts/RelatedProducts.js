import React, { useState } from 'react'
import Products from '../../Products/Products'
const RelatedProducts = ({filterProject}) => {
  const itemLength= filterProject.length
  const [isRelated, setRelated] = useState(true)
  return (
    <div className="related-products">
      <Products 
      categoryName={'Related'} 
      ItemLength={itemLength} 
      filterProject={filterProject}
      isRelated={isRelated}
      />
    </div>
  )
}

export default RelatedProducts
