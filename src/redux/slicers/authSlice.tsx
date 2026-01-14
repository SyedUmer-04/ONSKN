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
      return rejectWithValue(err.response ? err.response.data : err);
    }
  },
);

export const LoginAction = createAsyncThunk('Login', async data => {
  return await login(data);
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
        console.log("login Extra Reducer res ====> ", action.payload);
        state.user = action?.payload?.user
        state.token = action?.payload?.token
        
      })

  }
});

export const { setRememberMe } = authSlice.actions;
export default authSlice.reducer;

