// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import userReducer from "../features/userSlice";
import blogReducer from "../features/blogSlice";
import storage from "redux-persist/lib/storage"; // localStorage
import { combineReducers } from "redux";

// Step 1: Combine reducers (you may have more later)
const rootReducer = combineReducers({
    user: userReducer,
    blog: blogReducer
});

// Step 2: Config for persist
const persistConfig = {
    key: "root",
    storage,
};

// Step 3: Wrap rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Step 4: Create store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // required for redux-persist
        }),
});

// Step 5: Create persistor
export const persistor = persistStore(store);

// ✅ TypeScript types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
