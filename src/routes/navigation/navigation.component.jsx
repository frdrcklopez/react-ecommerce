import { useContext } from 'react'
import {  Outlet, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectCurrentUser } from '../../store/user/user.selector'
import { CartContext } from '../../contexts/cart.context'
import { 
    NavLinks, 
    LogoContainer, 
    NavLinksContainer, 
    NavigationContainer,
} from './navigation.styles.jsx'
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'

import { signOutUser } from '../../utils/firebase/firebase.utils'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser)
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