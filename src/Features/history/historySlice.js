import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  history: JSON.parse(localStorage.getItem('searchHistory')) || [],
  selected: null,
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addSearch(state, action) {
      const newEntry = { question: action.payload.question, answer: action.payload.answer };
      state.history.push(newEntry);
      localStorage.setItem('searchHistory', JSON.stringify(state.history));
    },
    selectSearch(state, action) {
      state.selected = state.history[action.payload];
    },
  },
});

export const { addSearch, selectSearch } = historySlice.actions;
export default historySlice.reducer;
