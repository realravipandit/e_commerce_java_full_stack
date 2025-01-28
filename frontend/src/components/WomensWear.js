import React, { useEffect, useState } from "react";
import axios from "axios";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import "../styles/MensDemo.css"
import { useNavigate } from "react-router-dom";

const WomensWear = () => {
  const [products, setProducts] = useState([]);
  const navigate=useNavigate();
  const customerEmail=localStorage.getItem("userEmail")

  // Fetch products from the backend
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products/category/womens%20wear")  // Replace with your API endpoint
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  // Limit to 5 products
  const limitedProducts = products;
  const addToCart = (productId) => {
    axios
    .post(`http://localhost:8080/api/cart/add?customerEmail=${customerEmail}&productId=${productId}&quantity=1`)
      .then((response) => {
        console.log("Product added to cart:", response.data);
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
      });
  };
  return (
    <div>
      <h1 className="text-center">Women's Wear</h1>
    <div className="product-list" style={{minHeight:'80vh'}}>
      {limitedProducts.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.imageUrls} alt={product.name} className="product-image" />
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <div className="product-price">
            ${product.price.toFixed(2)}
          </div>
          <button className="cart-button" onClick={() => addToCart(product.productId)}>
              Add to Cart
            </button>
        </div>
      ))}

        
    </div>
    </div>
  );
};

export default WomensWear;
