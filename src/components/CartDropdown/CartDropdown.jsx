import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import Button from '../Button/Button'
import CartItem from '../CartItem/CartItem'
import './CartDropdown.styles'
import { CartDropdownContainer, CartItems, EmptyMessage } from './CartDropdown.styles'

const CartDropdown = () => {

  const { cartItems } = useContext(CartContext);

  const navigate  = useNavigate();

  const redirectToCheckout = () => navigate('/checkout');

  return (
    <CartDropdownContainer>
      { cartItems.length 
        ? <CartItems>{cartItems.map(item => <CartItem key={item.id} cartItem={item}/>)}</CartItems>
        : <EmptyMessage>Your cart is empty</EmptyMessage>
      }
        
      <Button onClick={redirectToCheckout} >Checkout</Button>

    </CartDropdownContainer>
  )
}

export default CartDropdown