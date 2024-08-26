import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { categoryActions, mealsActions } from "../redux";
import { IMeal } from "../interfaces";
import css from '../styles/Meals.module.css';
import { useNavigate, useParams } from "react-router-dom";

const Meals: FC = () => {
    const { categories } = useAppSelector(state => state.categoryReducer);
    const { meals } = useAppSelector(state => state.mealsReducer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const [selectedMeals, setSelectedMeals] = useState<string[]>(() => {
        const storedMeals = localStorage.getItem('selectedMeals');
        return storedMeals ? JSON.parse(storedMeals) : [];
    });

    const categoryNames = categories.find(category => category.idCategory === id);
    const name = categoryNames?.strCategory;

    useEffect(() => {
        dispatch(categoryActions.getAll());
    }, [dispatch]);

    useEffect(() => {
        if (name) {
            dispatch(mealsActions.getAll(name));
        }
    }, [dispatch, name]);

    const toggleFavorite = (mealId: string) => {
        let updatedFavorites;
        if (selectedMeals.includes(mealId)) {
            updatedFavorites = selectedMeals.filter(id => id !== mealId);
        } else {
            updatedFavorites = [...selectedMeals, mealId];
        }

        setSelectedMeals(updatedFavorites);
        localStorage.setItem('selectedMeals', JSON.stringify(updatedFavorites));
    };

    const isFavorite = (mealId: string) => selectedMeals.includes(mealId);

    return (
        <div style={{ overflowX: "hidden" }} className={css.mainContainer}>
            {meals.map((meal: IMeal) => (
                <div
                    className={css.container}
                    key={meal.idMeal}
                    onClick={() => navigate(`/category/meals/${meal.idMeal}`)}
                >
                    <img src={meal.strMealThumb} alt={meal.strMeal} />
                    <div>{meal.strMeal}</div>
                
                    <button
                        className={isFavorite(meal.idMeal) ? css.favorite : css.notFavorite}
                    
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(meal.idMeal);
                        }}
                    >
                        {isFavorite(meal.idMeal) ? "Видалити з обраних" : "Додати до обраних"}
                    </button>
                </div>
                
            ))}
        
        </div>
    );
};

export { Meals };
