import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import CartDropdown from '../../components/CartDropdown/CartDropdown';
import CartIcon from '../../components/CartIcon/CartIcon';
import { CartContext } from '../../context/CartContext';
import { UserContext } from '../../context/UserContext';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import './Navigation.scss'

const Navigation = () => {

  const { currentUser } = useContext(UserContext);

  const { isCartOpen} = useContext(CartContext);

  

  const signOutHandler = async () => {
    await signOutUser();
  }

  return (
    <>
        <div className='navigation'>
            <Link className='logo-container' to='/' >
                <CrwnLogo className='logo' />
            </Link>
            <div className="nav-links-container">
                <Link className='nav-link' to='/shop' >Shop</Link>
                { currentUser 
                 ? (<span className='nav-link' onClick={signOutHandler}>Sign Out</span>)
                 : (<Link className='nav-link' to='/auth' >Sign In</Link>) 
                }
                <CartIcon />
            </div>
            {isCartOpen && <CartDropdown />}
        </div>
        <Outlet />
    </>
  )
}

export default Navigation