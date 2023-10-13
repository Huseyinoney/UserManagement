import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios"



export const login = createAsyncThunk("login", async (data, thunkAPI) => {
   
    
    try {
        const response = await axios.post("http://localhost:5000/login",
            {
                email: data.email,
                password: data.password
            })
        return response.data
    }
    catch (error) {
        return thunkAPI.rejectWithValue({ error: error.response.data.msg })
    }
})

export const register = createAsyncThunk("register", async (data, thunkAPI) => {
    
    
    try {
        const response = await axios.post("http://localhost:5000/register",
            {
                username: data.name,
                email: data.email,
                password: data.password,
                passwordConfirm: data.passwordComfirm,
                age: data.age,
                department: data.department
            })
        return response.data
    }
    catch (error) {
        return thunkAPI.rejectWithValue({ error: error.response.data.msg })
    }

})
export const logOut = createAsyncThunk("logOut", async (thunkAPI) => {
    const config = {
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
    };
    

    try {
        const response = await axios.post("http://localhost:5000/logout", {}, config)
        return response.data
    }
    catch (error) {
        return thunkAPI.rejectWithValue({ error: error.response.data.msg })
    }

})

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuth: false,
        user: null,
        token: null,
        message: null,
    },
    reducers: {
        clearMessage: (state) => {
            state.message = null
        },

    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
            state.isAuth = true
            localStorage.setItem("token", state.token)
        })
        builder.addCase(login.rejected, (state, action) => {
            state.user = null
            state.isAuth = false
            state.token = null
            state.message = action.payload.error
        })
        builder.addCase(register.fulfilled, (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
            state.isAuth = true
            localStorage.setItem("token", state.token)
        })
        builder.addCase(register.rejected, (state, action) => {
            state.isAuth = false
            state.user = null
            state.token = null
            state.message = action.payload.error
        })
        builder.addCase(logOut.fulfilled, (state, action) => {
            state.isAuth = false
            localStorage.removeItem("token")
            state.user = null
            state.token = null
        })
    }
})
export const { clearMessage, setEmailPassword } = authSlice.actions
export default authSlice.reducer
