import { PayloadAction, ValidateSliceCaseReducers, createSlice } from "@reduxjs/toolkit";
import { UserReducerInitialState } from "../../types/reducer-types";
import { User } from "../../types/types";


const userSlice = createSlice({
    name:"user",
    initialState:{loading:true, num:0 as number},
    reducers:{
        addUser(state, action:PayloadAction<number>){
            state.loading = false;
            state.num = action.payload + 1;
        },
        removeUser(state, action:PayloadAction<string>){
            state.loading = false;
            state.num = state.num - 1;
        }
    }
});

export {userSlice};
export const {addUser} = userSlice.actions;






// const initialState:UserReducerInitialState = {
//     user:null,
//     loading:true
// };

// export const userReducer = createSlice({
//     name:"userReducer",
//     initialState,
//     reducers:{
//         userExist:(state, action:PayloadAction<User>) => {
//             state.loading = false;
//             state.user = action.payload;
//         },
//         userNotExist:(state) => {
//             state.loading = false;
//             state.user = null;
//         }
//     }
// });

// export const {userExist, userNotExist} = userReducer.actions;