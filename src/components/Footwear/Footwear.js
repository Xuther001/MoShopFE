import React, { useEffect, useState, useRef } from 'react';
import axios from '../../configs/axiosConfig';
import ProductDetails from '../ProductDetails/ProductDetails';
import './Footwear.css';

const Footwear = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const productListRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        const filteredProducts = response.data.filter(product => product.category.id === 11);
        const sortedProducts = filteredProducts.sort((a, b) => a.id - b.id);
        
        const randomProducts = getRandomProducts(sortedProducts, 6);
        setProducts(randomProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getRandomProducts = (productsArray, count) => {
    const shuffled = productsArray.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const handleProductClick = (id) => {
    setSelectedProductId(id);
  };

  const handleCloseDetails = () => {
    setSelectedProductId(null);
  };

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="footwear-container">
      <div className="product-list" ref={productListRef}>
        {products.map((product) => (
          <div
            key={product.id}
            className="product-item"
            onClick={() => handleProductClick(product.id)}
          >
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <h2>{product.name}</h2>
          </div>
        ))}
      </div>

      {selectedProductId && (
        <ProductDetails productId={selectedProductId} onClose={handleCloseDetails} />
      )}
    </div>
  );
};

export default Footwear;