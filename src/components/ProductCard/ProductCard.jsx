import React, { useContext } from 'react'
import { CartContext } from '../../context/CartContext';
import Button, { BUTTON_TYPES } from '../Button/Button'
import './ProductCard.scss'

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;

  const { addItemToCart } = useContext(CartContext)

  const addProductToCart = () => addItemToCart(product);

  return (


    <div className='product-card-container'>
        <img src={ imageUrl } alt={ name } />

        <div className="footer">
            <span className="name">{ name }</span>
            <span className="price">{ price }</span>
        </div>

        <Button buttonType={BUTTON_TYPES.inverted} onClick={addProductToCart} >Add to Cart</Button>
    </div>
  )
}

export default ProductCard