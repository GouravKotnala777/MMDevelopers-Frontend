import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userAPI";
import { userReducer } from "./reducer/userReducer";
import { fetchPlotData } from "./api/plotAPI";
import { plotSlice } from "./reducer/plotSlice";



// export const store:any = configureStore({
//     reducer:{
//         plots:plotSlice.reducer
//     },
//     // middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(plotApi.middleware)
// });
export const store:any = configureStore({
    reducer:{
        [userApi.reducerPath]:userApi.reducer,
        [userReducer.name]:userReducer.reducer
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware)
});