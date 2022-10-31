import { useContext } from 'react'

import { 
    CheckoutItemContainer, 
    ImageContainer, 
    Name, 
    Quantity,
    Price,
    RemoveButton
} from './checkout-item.styles.jsx'
import { CartContext } from '../../contexts/cart.context'

const CheckoutItem = ({cartItem}) => {
    const { name, imageUrl, price, quantity } = cartItem
    const { clearItemFromCart , addItemToCart, removeItemToCart} = useContext(CartContext)

    const clearItemHandler = () => clearItemFromCart(cartItem)

    const addItemHandler = () => addItemToCart(cartItem)

    const removeItemHandler = () => removeItemToCart(cartItem)

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