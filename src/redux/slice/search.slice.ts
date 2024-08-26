import { IMeal, IMealDetails, IMeals } from '../../interfaces';
import { searchService } from '../../services';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ISearchsState {
    search: IMeal[],

}

const initialState: ISearchsState = {
    search: [],
}

const getAll = createAsyncThunk<IMeals<IMealDetails[]>, string>(
    'searchSliceGetAll',
    async (name, thunkAPI) => {
        try {
            const { data } = await searchService.getAll(name)
            return data

        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)


const slice = createSlice({
    name: 'mealsSlice',
    initialState,
    reducers: {},
    extraReducers: buider => {
        buider
            .addCase(getAll.fulfilled, (state, action) => {
                state.search = action.payload.meals
            })

    }
})

const { reducer: searchReducer, actions } = slice

const searchActions = {
    ...actions,
    getAll,
}

export {
    searchActions,
    searchReducer
}