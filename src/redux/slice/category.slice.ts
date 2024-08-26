import { ICategories } from '../../interfaces';
import { categoryService } from '../../services';
import { ICategory } from './../../interfaces/categories/category.interface';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ICategoryState {
    categories: ICategory[]
}

const initialState: ICategoryState = {
    categories: []
}

const getAll = createAsyncThunk<ICategories>(
    'categorySlicegetAll',
    async (_, thunkAPI) => {
        try {
            const { data } = await categoryService.getAll()
            return data

        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

const slice = createSlice({
    name: 'categorySlice',
    initialState,
    reducers: {},
    extraReducers: buider => {
        buider
        .addCase(getAll.fulfilled, (state, action) => {
            state.categories = action.payload.categories
        })
    }
})

const {reducer: categoryReducer, actions} = slice

const categoryActions = {
    ...actions,
    getAll
}

export {
    categoryActions,
    categoryReducer
}