import { useContext } from 'react'
import {  Outlet, Link } from 'react-router-dom'

import { NavigationContainer, LogoContainer, NavLinksContainer, NavLinks } from './navigation.styles.jsx'
import { UserContext } from '../../contexts/user.context'
import { CartContext } from '../../contexts/cart.context'
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'

import { signOutUser } from '../../utils/firebase/firebase.utils'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'

const Navigation = () => {
    const { currentUser } = useContext(UserContext)
    const { isCartOpen } = useContext(CartContext)

    const signOutHandler = async() =>{
        await signOutUser()
    }

    return (
        <>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrwnLogo className='logo'/>
                </LogoContainer>
                <NavLinksContainer>
                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>
                    {currentUser 
                        ? <NavLinks 
                            as="span" 
                            onClick={signOutHandler}
                        >
                            SIGN OUT
                        </NavLinks>
                        : <NavLinks 
                            to='/auth'
                        > 
                            SIGN IN 
                        </NavLinks>
                    }
                    <CartIcon />
                </NavLinksContainer>
                {isCartOpen && <CartDropdown/>}
            </NavigationContainer>
            <Outlet />
        </>
    )
}
 
export default Navigation