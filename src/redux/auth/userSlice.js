import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios"
import { toast } from 'react-toastify';

const getConfig = () => {
    const config = {
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
    };
    return config
}
export const getAllUser = createAsyncThunk("getUser", async () => {

    try {
        const response = await axios.get("http://localhost:5000/getAllUser", getConfig())
        return response.data
    }
    catch (error) {
        toast(error.response.data.msg, {
            position: 'top-center',
            autoClose: 3000
        })
    }
})
export const deleteUser = createAsyncThunk("deleteUser", async (id) => {
   
    try {
        const response = await axios.delete(`http://localhost:5000/deleteUser/${id}`, getConfig())
        return response.data
    }
    catch (error) {
        return rejectWithValue({ message: error.response.data.msg })
    }
})
export const updateUser = createAsyncThunk("updateUser", async (data, thunkAPI) => {
   
    try {
        const response = await axios.put(`http://localhost:5000/updateUser/${data.id}`,
            {
                email: data.email,
                age: data.age,
                department: data.department
            },
            getConfig())
        return response.data
    }
    catch (error) {
        console.log(error.response.data.msg)
        return thunkAPI.rejectWithValue({ message: error.response.data.msg })
    }
})

const userSlice = createSlice({
    name: "user",
    initialState: {
        users: [],
        message: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllUser.fulfilled, (state, action) => {
            state.users = action.payload.users
        })
        builder.addCase(getAllUser.rejected, (state, action) => {
            state.users = null
            state.message = action.payload.message
        })
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.users = state.users.filter((user) => user._id !== action.payload.id)
            state.message = action.payload.message
        })
    }


})
export default userSlice.reducer