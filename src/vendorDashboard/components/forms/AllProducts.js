import React, { useState, useEffect } from "react";
import { API_URL } from "../../data/apiPath";

export default function AllProducts() {
  const [products, setProducts] = useState([]);

  const productsHandler = async () => {
      const firmId = localStorage.getItem("firmId");

    try {
      const response = await fetch(`${API_URL}/product/${firmId}/products`);
      const newProductsData = await response.json();

      if (response.ok) {
        setProducts(newProductsData.products);
      }
    } catch (error) {
      console.log("failed to fetch product",error);
      alert("failed to fetch products")
    }
  };
   
     const deleteProductById = async(productId)=>{
      try{
      const response = await fetch(`${API_URL}/product/${productId}`,{
        method:"DELETE"
      })
      if(response.ok){
        setProducts(products.filter((product) => product._id !== productId));
        // confirm("are you sure, you want to delete?")
        alert("Product deleted successfully")
      }
      }
      catch(error){
     console.error('Failed to delete product');
     alert('Failed to delete product')
      }
     }
 

  useEffect(() => {
    productsHandler();
  }, []);
return (
  <div className="table-container">
    {products.length === 0 ? (
      <p className="no-products">No products added</p>
    ) : (
      <table className="product-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item._id}>
              <td>{item.productName}</td>
              <td>₹ {item.price}</td>
              <td>
                {item.image && (
                  <img
                    className="product-image"
                    src={`${API_URL}/uploads/${item.image}`}
                    alt={item.productName}
                  />
                )}
              </td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteProductById(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);

}
