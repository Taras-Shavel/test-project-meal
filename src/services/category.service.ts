import { urls } from "../constants";
import { ICategories } from "../interfaces";
import { IRes } from "../types";
import { axiosService } from "./axios.service";

const categoryService = {
    getAll: (): IRes<ICategories> => axiosService.get(urls.categories)
}

export {
    categoryService
}