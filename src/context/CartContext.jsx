import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    reduceItemFromCart: () => {},
    cartCount: 0,
    clearItemFromCart: () => {},
    cartTotal: 0
})

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);

    if (existingCartItem) {
        return cartItems.map(cartItem => cartItem.id === existingCartItem.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem);
    }

    return [...cartItems, {...productToAdd, quantity: 1}];
}

const reduceCartItem = (cartItems, productToRemove) => {
    const items =  cartItems.map(cartItem => {
        if (cartItem.id !== productToRemove.id) {
            return cartItem;
        }

        if (cartItem.quantity > 1) {
            return {...cartItem, quantity: cartItem.quantity - 1}
        }
    })

    return items.filter(Boolean);
}

const clearItemFromCart = (cartItems, productToRemove) => {
    return cartItems.filter(item => item.id !== productToRemove.id);
}

export const CartProvider = ( { children } ) => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
      const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)

      setCartCount(newCartCount);
    }, [cartItems])

    useEffect(() => {
        const newTotal = cartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0);

        setCartTotal(newTotal);
    }, [cartItems])
    

    const addItemToCart = productToAdd => setCartItems(addCartItem(cartItems, productToAdd));
    const reduceItemFromCart = productToRemove => setCartItems(reduceCartItem(cartItems, productToRemove));
    const clearCartItem = productToRemove => setCartItems(clearItemFromCart(cartItems, productToRemove));

    return (
        <CartContext.Provider value={ {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, reduceItemFromCart, clearCartItem, cartTotal} }>
            {children}
        </CartContext.Provider>
    )
}