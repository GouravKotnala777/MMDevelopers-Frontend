import { configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/query";
import { userAPI } from "./api/userAPI";
import { userSlice } from "./reducer/userReducer";
// import { userReducer, userSlice } from "./reducer/userReducer";

// export const server = process.env.REACT_APP_SERVER;

export const store = configureStore({
    reducer:{
        users:userSlice.reducer
    }
})

// export const store = configureStore({
//     reducer:{
//         [userAPI.reducerPath]:userAPI.reducer,
//         [userReducer.name]:userReducer.reducer
//     },
//     middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(userAPI.middleware)
// });













// export const store = configureStore({
//     reducer:{
//         [userAPI.reducerPath]:userAPI.reducer,
//     },
//     middleware:(getDefaultMiddleware) => [...getDefaultMiddleware(), userAPI.middleware],
// });

// setupListeners(store.dispatch);