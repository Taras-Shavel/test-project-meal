import { urls } from '../constants';
import { IMeal, IMealDetails, IMeals } from '../interfaces';
import { IRes } from './../types/axiosRes.type';
import { axiosService } from './axios.service';

const mealsService = {
    getAll: async (id: string): Promise<IRes<IMeals<IMeal[]>>> => axiosService.get(urls.meals(id)),
    getById: async (id: string): Promise<IMealDetails> => {
        const response = await axiosService.get(urls.meal(id));
        const [meal] = response.data.meals;
        return meal; 
    }
}


export {
    mealsService
}