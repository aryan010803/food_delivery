import React, { createContext, useContext, useReducer } from 'react'
const CartStateContext = createContext();
const CartDispatchContext = createContext();
const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, qtn: action.qtn, size: action.size, price: action.price, img: action.img }]

        case "REMOVE":
            let newArr = [...state];
            newArr.splice(action.index, 1);
            return newArr;
        case "UPDATE":
            let arr = [...state]
            arr.find((food, index) => {
                if (food.id === action.id) {
                    console.log(food.qtn, parseInt(action.qtn), action.price + food.price)
                    arr[index] = { ...food, qtn: parseInt(action.qtn) + food.qtn, price: action.price + food.price }
                }
                return arr
            })
            return arr
            case "DROP":
                let empArr = []
                return empArr;  
        default:
            console.log("error in reducer");

    }
}

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>

    )
}
export const useCart = () => useContext(CartStateContext);
export const useDispatch = () => useContext(CartDispatchContext);