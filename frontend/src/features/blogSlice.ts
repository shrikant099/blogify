
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface BlogState {
  blogData: any; 
  latestSix: any;
  searchData: []

}

const initialState: BlogState = {
  blogData: [],
  latestSix: [],
  searchData: []
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlogData: (state, action: PayloadAction<any>) => {
      state.blogData = action.payload;
    },
    setLatestSixBlogs: (state, action: PayloadAction<any>) => {
      state.latestSix = action.payload;
    },
    setSearchData: (state, action: PayloadAction<any>) => {
      state.searchData = action.payload;
    },
    
  },
});

export const { setBlogData ,setLatestSixBlogs , setSearchData} = blogSlice.actions;
export default blogSlice.reducer;
