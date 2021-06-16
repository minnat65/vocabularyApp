import { Fragment, useEffect } from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux'
import WordList from '../components/wordlist/wordList';
import { wordAction } from '../store/wordSlice';

const Home = () => {
    const dispatch = useDispatch();
    
    const wordFlag = useSelector(state => state.word.isWordAdded);
    useEffect( ()=> {
        const fetchWord = async function(){
            const wordsList = await axios({
                method: 'GET',
                url: '/api/v1/word',
            });

            dispatch(wordAction.setWordList(wordsList.data.words));
            return wordsList.data;
        }

        fetchWord();
    }, [dispatch, wordFlag]);

    return (
        <Fragment>
            <WordList />
        </Fragment>
    )
}

export default Home;