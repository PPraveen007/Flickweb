import { createSlice } from '@reduxjs/toolkit'

const initialState = { userEmail: null, loggedIn: false }

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setActiveUser: (state: any, action: any) => {
            state.userEmail = action.payload.userEmail
            state.loggedIn = action.payload.loggedIn
        },
        setUserLogOutState: (state: any) => {
            state.userEmail = null
            state.loggedIn = false
        }
    }
});

export const { setActiveUser, setUserLogOutState } = userSlice.actions
export const selectUserEmail = (state: any) => state.user.userEmail
export const selectLoggedIN = (state: any) => state.user.loggedIn
export default userSlice.reducer