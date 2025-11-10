
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userData: any; // you can change `any` to a custom type later
  currentUser: any
}

const initialState: UserState = {
  userData: null,
  currentUser: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<any>) => {
      state.userData = action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<any>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setUserData  , setCurrentUser} = userSlice.actions;
export default userSlice.reducer;
