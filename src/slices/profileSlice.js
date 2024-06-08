import { createSlice } from "@reduxjs/toolkit";

<<<<<<< HEAD
const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  image: localStorage.getItem("image") ? localStorage.getItem : null,
  loading: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setUser(state, value) {
      state.user = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
  },
=======

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse( localStorage.getItem( "user" ) ) : null,
    loading: false,
}

const profileSlice = createSlice ({
    name: "profile",
    initialState: initialState,
    reducers: {
        setUser( state, value ) {
            state.user = value.payload
        },
        setLoading ( state, value ){
            state.loading = value.payload
        },
    },
>>>>>>> 7953e65eac7bf48d4a32f70a1e4bdc97f2183dc7
});

export const { setUser, setLoading } = profileSlice.actions;
export default profileSlice.reducer;
<<<<<<< HEAD
=======

>>>>>>> 7953e65eac7bf48d4a32f70a1e4bdc97f2183dc7
