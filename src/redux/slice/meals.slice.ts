import { IMeal, IMealDetails, IMeals } from '../../interfaces';
import { mealsService } from '../../services';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IMealsState {
    meals: IMeal[],
    meal: IMealDetails | null,
}

const initialState: IMealsState = {
    meals: [],
    meal: null
}

const getAll = createAsyncThunk<IMeals<IMeal[]>, string>(
    'mealsSliceGetAll',
    async (id, thunkAPI) => {
        try {
            const { data } = await mealsService.getAll(id)
            return data

        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

const getById = createAsyncThunk<IMealDetails, string>(
    'mealSliceGetById',
    async (id, thunkAPI) => {
        try {
            const data = await mealsService.getById(id); 
            return data; 
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

const slice = createSlice({
    name: 'mealsSlice',
    initialState,
    reducers: {},
    extraReducers: buider => {
        buider
            .addCase(getAll.fulfilled, (state, action) => {
                state.meals = action.payload.meals
            })
            .addCase(getById.fulfilled, (state, action) => {
                state.meal = action.payload
            })
    }
})

const { reducer: mealsReducer, actions } = slice

const mealsActions = {
    ...actions,
    getAll,
    getById
}

export {
    mealsActions,
    mealsReducer
}