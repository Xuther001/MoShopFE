import React, { useState, useEffect } from 'react';
import axios from '../../configs/axiosConfig';
import './MyCart.css';

function MyCart() {
  const [cartItems, setCartItems] = useState([]);
  const [quantityInput, setQuantityInput] = useState({});
  const [error, setError] = useState(null);
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`/cart/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCartItems(response.data.cartItems || []);
        const initialQuantities = {};
        response.data.cartItems.forEach(item => {
          initialQuantities[item.productId] = item.quantity;
        });
        setQuantityInput(initialQuantities);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCart();
  }, [username, token]);

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      if (newQuantity <= 0) {
        throw new Error("Quantity must be greater than zero");
      }

      await axios.post(`/cart/update`, null, {
        params: { productId, quantity: newQuantity },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const response = await axios.get(`/cart/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCartItems(response.data.cartItems || []);
    } catch (err) {
      console.error("Error updating quantity:", err);
      setError(err.message);
    }
  };

  const handleInputChange = (event, productId) => {
    const newQuantity = event.target.value;

    setQuantityInput({
      ...quantityInput,
      [productId]: newQuantity,
    });
  };

  const handleInputBlur = (productId) => {
    const newQuantity = quantityInput[productId];

    if (newQuantity === '') {
      const currentItem = cartItems.find(item => item.productId === productId);
      setQuantityInput({
        ...quantityInput,
        [productId]: currentItem.quantity,
      });
    } else {
      const parsedQuantity = parseInt(newQuantity, 10);
      if (!isNaN(parsedQuantity)) {
        handleQuantityChange(productId, parsedQuantity);
      }
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      if (!productId) {
        throw new Error("Product ID is missing");
      }
      await axios.post(`/cart/remove`, null, {
        params: { productId },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const response = await axios.get(`/cart/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCartItems(response.data.cartItems || []);
    } catch (err) {
      console.error("Error removing from cart:", err);
      setError(err.message);
    }
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="my-cart-container">
      <h2>My Cart</h2>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.productName} className="cart-item">
            <img src={item.productImageUrl} alt={item.productName} />
            <div className="cart-item-details">
              <p className="item-value item-name">{item.productName}</p>
              <p className="item-label">Description:</p>
              <p className="item-value item-description">{item.productDescription}</p>
              <div className="quantity-row">
                <p className="item-label">Quantity:</p>
                <input
                  type="number"
                  value={quantityInput[item.productId] || ''}
                  min="1"
                  onChange={(e) => handleInputChange(e, item.productId)}
                  onBlur={() => handleInputBlur(item.productId)} // Validate on blur
                />
              </div>
              <div className="price-row">
                <p className="item-label">Total Price:</p>
                <p className="item-value item-price">${item.totalPrice.toFixed(2)}</p>
              </div>
              <button 
                className="remove-button"
                onClick={() => handleRemoveFromCart(item.productId)}
              >
                Remove
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="empty-cart-message">Your cart is empty.</p>
      )}
    </div>
  );
}

export default MyCart;