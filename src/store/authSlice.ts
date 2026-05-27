import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token : null as string | null,
    user : null as any,
    role : null as any,
};
const authSlice  = createSlice({
    name : 'auth',
    initialState,
    reducers: {
        setToken(state, action) {state.token = action.payload;},
        setUser(state, action) {state.user = action.payload;},
        setRole(state, action) {state.role = action.payload; },
        logout(state) {
                state.token = null;
                state.user = null;
                state.role = null;
        }
    }
});
export const { setToken, setUser, setRole, logout } = authSlice.actions;
export default authSlice.reducer;




