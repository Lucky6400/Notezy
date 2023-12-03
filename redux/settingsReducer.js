import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    name: "",
    mode: "light"
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        saveSettings(state, action) {
            state.name = action.payload.name;
            state.mode = action.payload.mode ? "dark" : "light";
        }
    }
});

export const settingsReducer = settingsSlice.reducer;
export const settingAction = settingsSlice.actions;