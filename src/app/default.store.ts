import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, AppThunk } from "./store";

const defaultStore = createSlice({
    name: 'Default',
    initialState: {
        data: {} as string
    },
    reducers: {
        setData(state, action: PayloadAction<string>) {
            state.data = action.payload;
        }
    }

})