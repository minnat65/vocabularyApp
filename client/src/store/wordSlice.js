import { createSlice } from '@reduxjs/toolkit';

const initialState = { wordsList: [], filteredWords: [], isWordAdded: false }

const wordSlice = createSlice({
    name: 'word-slice',
    initialState,
    reducers: {
        setWordList(state, action) {
            state.wordsList = action.payload;
            state.filteredWords= state.wordsList.reverse();
        },
        setFilteredWords(state, action) {
            if (action.payload.length > 0) {
                state.filteredWords = state.wordsList.filter(words =>
                    words.word.includes(action.payload));
            } else{
                state.filteredWords= state.wordsList;
            }
        },
        setIsWordAdded(state, action){
            state.isWordAdded=action.payload;
            
        }
    }
});

export const wordAction = wordSlice.actions;

export default wordSlice.reducer;