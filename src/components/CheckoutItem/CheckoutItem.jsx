import React, { useContext } from 'react'
import { CartContext } from '../../context/CartContext';
import './CheckoutItem.scss'

const CheckoutItem = ({ cartItem }) => {
  const { name, price, quantity, imageUrl} = cartItem;

  const { clearCartItem, addItemToCart, reduceItemFromCart } = useContext(CartContext)

  const clearCart = () => clearCartItem(cartItem);

  const decrementQuantity = () => reduceItemFromCart(cartItem);
  
  const incrementQuantity = () => addItemToCart(cartItem);
  
  return (
    <div className='checkout-item-container'>
        <div className="image-container">
            <img src={imageUrl} alt={name} />
        </div>
        <span className='name'>{name}</span>
        <span className='quantity'>
            <div className="arrow" onClick={decrementQuantity} >&#10094;</div>
            <span className="value">{quantity}</span>
            <div className="arrow" onClick={incrementQuantity} >&#10095;</div>
        </span>
        <span className='price'>${price}</span>

        <div className="remove-button" onClick={clearCart} >&#10005;</div>
    </div>
  )
}

export default CheckoutItem