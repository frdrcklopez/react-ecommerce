import { useSelector } from 'react-redux'

import {
    CheckoutContainer,
    CheckoutHeader,
    HeaderBlock,
    Total,
} from './checkout.styles';
import { selectCartTotal, selectCartItems } from '../../store/cart/cart.selector'
import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import PaymentForm from '../../components/payment-form/payment-form.component'


const CheckOut = () => {
    const cartItems = useSelector(selectCartItems)
    const cartTotal = useSelector(selectCartTotal)

    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader>
            {cartItems.map((cartItem) => {
                return (
                    <CheckoutItem 
                        key={cartItem.id}
                        cartItem={cartItem}
                    />
                )
            })}
            <Total>Total: ${cartTotal}</Total>
            <PaymentForm />
        </CheckoutContainer>
    );
}
 
export default CheckOut;