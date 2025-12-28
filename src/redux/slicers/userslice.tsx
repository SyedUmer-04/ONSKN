import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, signup } from "../../api";

const initialState = {
    user: [],
    token: '',
}

export const SignUp = createAsyncThunk('SignUp', data => {
    return signup(data);
})

export const authSLice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {

    }
}) 