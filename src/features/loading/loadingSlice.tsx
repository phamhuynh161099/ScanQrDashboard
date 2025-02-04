import { RootState } from '@/app/store';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



// Define a type for the slice state
interface LoadingState {
    isLoading: boolean,
}

// Define the initial state using that type
const initialState: LoadingState = {
    isLoading: false,
}

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setStartLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setEndLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
})


export const { setStartLoading, setEndLoading } = loadingSlice.actions;
export const selectLoading = (state: RootState) => state.counter.value;

const loadingReducer = loadingSlice.reducer
export default loadingReducer;
