import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { MessageResponse, UserResponse } from "../../types/api-types";
import { User } from "../../types/types";
// import { server } from "../store";


export const userAPI = createApi({
    reducerPath:"userApi",
    baseQuery:fetchBaseQuery({baseUrl:`${process.env.REACT_APP_SERVER}/api/v1/user/`}),
    endpoints:(builder) => ({
        login:builder.mutation<MessageResponse, User>({
            query:(user) => ({
                url:"new",
                method:"POST",
                body:user
            })
        })
    })
});

export const getUser = async(id:string) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_SERVER}/api/v1/user/${id}`, {
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        });

        const data:UserResponse = await res.json();
        console.log("------redux/api/userApi.ts data");
        console.log(data);
        console.log("------redux/api/userApi.ts data");
        return data;
    } catch (error) {
        console.log("------redux/api/userApi.ts error");
        throw error;
    }
};

export const {useLoginMutation} = userAPI;