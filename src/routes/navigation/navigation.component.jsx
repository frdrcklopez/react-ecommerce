import {  Outlet, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { signOutStart } from '../../store/user/user.action'
import { selectCurrentUser } from '../../store/user/user.selector'
import { selectIsCartOpen } from '../../store/cart/cart.selector'
import { 
    NavLinks, 
    LogoContainer, 
    NavLinksContainer, 
    NavigationContainer,
} from './navigation.styles.jsx'
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'

const Navigation = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector(selectCurrentUser)
    const isCartOpen = useSelector(selectIsCartOpen)

    const signOutHandler = () => dispatch(signOutStart())

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