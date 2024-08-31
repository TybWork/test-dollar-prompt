import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../Redux/Features/counter/CounterSlice'
import navbarReducer from '../Redux/Features/navbar/navbarSlice'
import cartSlice from './Features/cart/cartSlice'
import datePickerSlice from './Features/datePicker/datePickerSlice'

export const store = configureStore(
    {
        reducer: {
            // we can give any name instead of "counter","navbar","cart" etc.
            counter: counterReducer,
            navbar: navbarReducer,
            cart: cartSlice,
            datepicker: datePickerSlice
        },
    },
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)