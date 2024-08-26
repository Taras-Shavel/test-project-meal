import { FC, useEffect } from "react";
import { categoryActions } from "../redux";
import css from '../styles/Header.module.css'
import { useAppDispatch, useAppSelector } from "../hooks";
import { ICategories } from "../interfaces";
import { useNavigate, useParams } from "react-router-dom";
import { log } from "console";
import {Link} from 'react-router-dom';

const Header: FC = () => {
    const { categories } = useAppSelector(state => state.categoryReducer)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const link = useParams()

    useEffect(() => {
        dispatch(categoryActions.getAll())
    }, [dispatch])

console.log(link)

    return (
        <div className={css.container}>
            <Link to={'/category'} className={css.link} >
                    MEALS-HUB
                </Link>
            <div className={css.blockButtons}>
                {categories.map((item) => (
                    <button key={item.idCategory} onClick={() => navigate(`/category/${item.idCategory}`)}>{item.strCategory}</button>
                ))}
            </div>
        </div>
    )
}
export { Header }