import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login, signup } from '../../api';

const initialState = {
  user: [],
  email: '',
  password: '',
  token: '',
};

export const SignUpAction = createAsyncThunk(
  'SignUp',
  async (data, { rejectWithValue }) => {
    //   return await signup(data);
    try {
      const response = await signup(data);
      console.log('Inside response SignupActiopn ===>>,', response);

      return response;
    } catch (err) {
      console.log('Inside err SignupActiopn ===>>,', err);
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  },
);

export const LoginAction = createAsyncThunk('Login', async data => {
  return await login(data);
});

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setRememberMe: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.token = action.payload.token;
      console.log('remember me data ===> ', action.payload );
      
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginAction.fulfilled, (state, action) => {
        console.log("login Extra Reducer res ====> ", action.payload);
        
      })

  }
});

export const { setRememberMe } = authSlice.actions;
export default authSlice.reducer;
