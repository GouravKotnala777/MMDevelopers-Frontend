import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Plot } from "../../types/types";



interface PlotReducerInitialState {
    plot:Plot|null;
    loading:boolean;
};

const initialState:PlotReducerInitialState = {
    plot:null,
    loading:true
};

export const plotSlice = createSlice({
    name:"plot",
    initialState:initialState,
    reducers:{
        plotExist:(state, action:PayloadAction<Plot>) => {
            state.loading = false;
            state.plot = action.payload;
        },
        plotNotExist:(state) => {
            state.loading = false;
            state.plot = null;
        }
    }
});

export const {plotExist, plotNotExist} = plotSlice.actions;