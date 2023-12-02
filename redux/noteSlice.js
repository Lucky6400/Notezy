import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    notes: [],
    favorites: []
}

export const noteSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        addNote(state, action) {
            state.notes.unshift(action.payload)
        },
        deleteNote(state, action) {
            state.notes = state.notes.filter(s => s.id !== action.payload.id);
            state.favorites = state.favorites.filter(s => s.id !== action.payload.id)
        },
        addToFavorite(state, action) {
            const idx = state.notes.findIndex(s => s.id === action.payload.id);
            state.notes[idx].isFavourite = true;
            state.favorites.unshift(action.payload)
        },
        removeFromFavorite(state, action) {
            const idx = state.notes.findIndex(s => s.id === action.payload.id);
            state.notes[idx].isFavourite = false;
            state.favorites = state.favorites.filter(s => s.id !== action.payload.id)
        },
        editNote(state, action) {
            const idx = state.notes.findIndex(s => s.id === action.payload.id);
            state.notes[idx] = action.payload;
        }
    }
})

export const noteReducer = noteSlice.reducer;
export const noteAction = noteSlice.actions;