import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MessageResponse } from "../../types/api-types";
import { User } from "../../types/types";




export const fetchPlotData = async() => {
    try {
        // const dispatch = useDispatch()
        // const res = await fetch(`http://localhost:8000/api/v1/plot/site_name/${name}/plot/${plot_no}`, {
        const res = await fetch(`http://localhost:8000/api/v1/plot/site_name/Jajru(Ist)/plot/1`, {
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        });

        console.log("----------- ClientPlot.tsx");
        const data = await res.json();
        console.log(data);
        console.log("----------- ClientPlot.tsx");
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
};






// export const plotApi = createApi({
//     reducerPath:"plotApi",
//     // baseQuery:fetchBaseQuery({baseUrl:`${process.env.REACT_APP_SERVER}/api/v1/plot/site_name/${name}/plot/${plot_no}`}),
//     baseQuery:fetchBaseQuery({baseUrl:`${process.env.REACT_APP_SERVER}/api/v1/plot/site_name/Jajru(Ist)/plot/1`}),
//     endpoints:(builder) => ({
//         selectedPlot:builder.query<MessageResponse, User>({
//             query:(plot) => ({
//                 url:"",
//                 method:"GET",
//                 body:plot
//             })
//         })
//     })
// });

// export const {useSelectedPlotQuery} = plotApi;