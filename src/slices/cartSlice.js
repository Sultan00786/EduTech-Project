import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    totalItems: localStorage.getItem("totalItems") ? JSON.parse( localStorage.getItem("totalItems") ) : 0,
}

const cardSlice = createSlice ({
    name: "profile",
    initialState: initialState,
    reducers: {
        setTotalItems( state, value ) {
            state.user = value.payload
        },
        // add to cart
        // remove from cart
        // reset cart
    },
});

export const { setTotalItems } = cardSlice.actions;
export default cardSlice.reducer;
