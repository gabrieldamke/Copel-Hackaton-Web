import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, AppThunk } from "./store";

const defaultStore = createSlice({
    name: 'default',
    initialState: {
        data: {} as string
    },
    reducers: {
        setData(state, action: PayloadAction<string>) {
            state.data = action.payload;
        }
    }

})
export const { setData } = defaultStore.actions

export default defaultStore.reducer;
/*
export function GetData(param: any): AppDispatch {
    return async function (dispatch: AppDispatch | any) {
        console.log('a');
    };
}
*/