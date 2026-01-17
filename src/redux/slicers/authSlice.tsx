import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { forgotPassword, login, signup, verifyOtp } from '../../api';

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
      return response;

    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : err);

    }
  },
);

export const LoginAction = createAsyncThunk('Login', async data => {
  return await login(data);
});

export const ForgotPasswordAction = createAsyncThunk('ForgotPassword', async data => {
  return await forgotPassword(data);
});

export const VerifyOtpAction = createAsyncThunk('Verifytp', async data => {
  return await verifyOtp(data);
});

const authSlice = createSlice({
  name: 'authSlice',
  initialState : {
    credentials: {
    email : '',
    password: '',
    token: '',
  },
  user: null,
  token: null,
  verifyOTPEmail: null,


},
  reducers: {
    setRememberMe: (state, action) => {
      state.credentials.email = action.payload.email;
      state.credentials.password = action.payload.password;
      state.credentials.token = action.payload.token;
      console.log('remember me data ===> ', action.payload );
      
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginAction.fulfilled, (state, action) => {
        state.user = action?.payload?.user
        state.token = action?.payload?.token
        
      })
    builder
      .addCase(ForgotPasswordAction.fulfilled, (state, action) => {
        state.verifyOTPEmail = action?.payload?.email
      })

  }
});

export const { setRememberMe } = authSlice.actions;
export default authSlice.reducer;

