import { FC, useState } from "react";
import css from '../styles/MainPage.module.css';
import { useAppDispatch, useAppSelector } from "../hooks";
import { searchActions } from "../redux";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import { BorderAll } from "@mui/icons-material";

const MainPage: FC = () => {
    const { search } = useAppSelector(state => state.searchReducer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSearch = () => {
        if (query.trim()) {
            dispatch(searchActions.getAll(query));
            console.log(search);
            handleOpen();
        } else {
            console.log("Search query is empty.");
        }
    };

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 900,
        height: 500,
        bgcolor: 'background.paper',
        border: 'none',
        boxShadow: 24,
        p: 1,
        
    };

    return (
        <div className={css.container}>
            Welcome

            <div style={{ display: 'flex', alignItems: 'center', width: '50%' }}>
                <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    fullWidth
                    style={{ marginRight: '8px' }}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <IconButton
                    color="primary"
                    onClick={handleSearch}
                >
                    <SearchIcon />
                </IconButton>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                       Results:
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {search.length > 0 ? (
                            <ul className={css.listMeals}>
                                {search.map((meal: any) => (
                                    <li key={meal.idMeal} onClick={() => navigate(`/category/meals/${meal.idMeal}`)} style={{cursor: "pointer"}}>
                                        <img
                                            src={meal.strMealThumb}
                                            alt={meal.strMeal}
                                            // style={{ width: "100px", height: "100px" }}
                                        />
                                        <h3>{meal.strMeal}</h3>
                                        
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No results found.</p>
                        )}
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export { MainPage };
