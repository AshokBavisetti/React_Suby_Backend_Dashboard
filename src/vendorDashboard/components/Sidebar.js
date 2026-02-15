import React from 'react'

export default function Sidebar({
  showFirmHandler,
  showProductHandler,
  showAllProducts,
  showFirmTitle,
}) {
  return (
    <div className="sideBarSection">
      <ul>
        {showFirmTitle?  <li onClick={showFirmHandler}> Add Firm</li>:""
}
        <li onClick={showProductHandler}> Add Product</li>
        <li onClick={showAllProducts}> All Products</li>
        <li> User Details</li>
      </ul>
    </div>
  );
}
