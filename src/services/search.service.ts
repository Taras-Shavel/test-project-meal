import { IMealDetails, IMeals } from "../interfaces";
import { IRes } from "../types";
import { axiosService } from "./axios.service";
import { urls } from "../constants";

const searchService = {
    getAll: (name: string):IRes<IMeals<IMealDetails[]>> => axiosService.get(urls.search(name)) 
}

export {
    searchService
}