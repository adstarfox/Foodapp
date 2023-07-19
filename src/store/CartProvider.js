import { useReducer } from "react"

import CartContext from "./cart-context"

const defaoultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if (action.type === 'ADD'){
        const updatedItems = state.items.concat(action.item)
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
    }
    return defaoultCartState
} 

const CartProvider = props => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaoultCartState)

    const addItemToCartHander = item => {
        dispatchCartAction({type: 'ADD', item: item})
    }

    const removeItemFromCartHandler = id => {
        dispatchCartAction({type: 'REMOVE', id: id})
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHander,
        removeItem: removeItemFromCartHandler
    }

    return(
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider