import { createSlice } from '@reduxjs/toolkit';
import { fetchLocalsList } from './localsFetch';
const initialState = {
    locals: [],
    status: 'idle',
    error: null,
};

export const locals = createSlice({
    name: "locals",
    initialState,
    reducers: {
        getLocals: (state, action) => {
            state.locals = action.payload;
        },
        updateLocals: (state, action) => {

        },
        errorMessageLocals: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        extraReducers: {
            [fetchLocalsList.pending]: (state, action) => {
                state.status = 'loading'
            },
            [fetchLocalsList.fulfilled]: (state, action) => {
                state.status = 'succeeded';
                // console.log(action.payload)
                // state.locals.push(action.payload)
            },
            [fetchLocalsList.rejected]: (state, action) => {
                state.status = 'failed';
                state.errorMessage = action.error.message
            }
        }
    }
})