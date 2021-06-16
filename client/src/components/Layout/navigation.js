import SearchIcon from '@material-ui/icons/Search';
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import classes from './navigation.module.css';
import { wordAction } from '../../store/wordSlice';
import WordForm from '../wordlist/wordForm';
import {Button} from '@material-ui/core'

const Navigation = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const [isWordFormShow, setIsShowForm] = useState(false);
    
    useEffect( () => {
        if(searchTerm.length>=0){
            dispatch(wordAction.setFilteredWords(searchTerm));
        }
        
    }, [dispatch, searchTerm])

    const searchHandler = (e) => {
        setSearchTerm(e.target.value);
    }
    const showAddWordHandler = () => {
        setIsShowForm(true);
    }
    const hideAddWordHandler = () => {
        setIsShowForm(false);
    }

    return(
        <nav className={classes.navbar}>
            <h3>Vocab</h3>
            <div>
                <input type='text' placeholder='Search word' onChange={searchHandler}/>
                <button>
                    <SearchIcon />
                </button>
            </div>
            
            <Button onClick={showAddWordHandler} variant="contained" color='secondary'>Add Word</Button>
            {isWordFormShow && <WordForm hideForm={hideAddWordHandler}/>}
        </nav>
    )
}

export default Navigation;