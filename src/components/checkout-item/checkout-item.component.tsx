import { FC } from 'react'
import { useDispatch,  useSelector } from 'react-redux'

import { addItemToCart, clearItemFromCart, removeItemFromCart } from '../../store/cart/cart.action'
import { selectCartItems } from '../../store/cart/cart.selector'
import { 
    CheckoutItemContainer, 
    ImageContainer, 
    Name, 
    Quantity,
    Price,
    RemoveButton
} from './checkout-item.styles'

import { CartItem } from '../../store/cart/cart.types';

type CartItemProps = {
    cartItem : CartItem
}

const CheckoutItem: FC<CartItemProps> = ({cartItem}) => {
    const { name, imageUrl, price, quantity } = cartItem

    const cartItems = useSelector(selectCartItems)
    const dispatch = useDispatch()
        
    const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem))

    const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem))

    const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem))

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`}/>
            </ImageContainer>
            <Name>{name}</Name>
            <Quantity>
                <div 
                    className='arrow' 
                    onClick={removeItemHandler}
                >
                    &#10094;
                </div>
                <span className='value'>
                    {quantity}
                </span>
                <div 
                    className='arrow' 
                    onClick={addItemHandler}
                >
                    &#10095;
                </div>
            </Quantity>
            <Price>{price}</Price>
            <RemoveButton onClick={clearItemHandler}>
                &#10005;
            </RemoveButton>
        </CheckoutItemContainer>
    );
}
 
export default CheckoutItem;