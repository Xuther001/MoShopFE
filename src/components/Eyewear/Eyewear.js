import React, { useEffect, useState } from 'react';
import axios from '../../configs/axiosConfig';
import ProductDetails from '../ProductDetails/ProductDetails';
import './Eyewear.css';

const Eyewear = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        const filteredProducts = response.data.filter(product => product.category.id === 21);

        const randomProducts = getRandomProducts(filteredProducts, 6);
        setProducts(randomProducts);
      } catch (err) {
        setError(err.message);
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

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="eyewear-container">
      <div className="product-list">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-item"
            onClick={() => handleProductClick(product.id)}
          >
            <img src={product.imageUrl} alt={product.name} className="product-image" />
          </div>
        ))}
      </div>

      {selectedProductId && (
        <ProductDetails productId={selectedProductId} onClose={handleCloseDetails} />
      )}
    </div>
  );
};

export default Eyewear;