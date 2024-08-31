import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    date: '01 Aug 2004',
    isVisible: false
}

export const datePickerSlice = createSlice({
    name: 'datePicker',
    initialState,
    reducers: {
        setDate: (state, action) => {
            state.date = action.payload
        },
        setIsVisible: (state, action) => {
            state.isVisible = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setDate, setIsVisible } = datePickerSlice.actions

export default datePickerSlice.reducer