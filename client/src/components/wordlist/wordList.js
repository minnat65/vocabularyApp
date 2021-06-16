import Card from '../UI/Card';
import Word from './word';
import { useSelector } from 'react-redux'
import { } from '../../store/wordSlice';


const WordList = () => {

    let wordLists;
    
    const filteredWords = useSelector(state => state.word.filteredWords);
    
    if (filteredWords.length !== 0) {

        wordLists = filteredWords.map(word =>
            <Word
                key={word._id}
                id={word._id}
                word={word.word}
                description={word.description[0].lexicalCategory.text}
                definition={word.description[0].entries[0].senses[0].definitions[0]}
            />);
    }

    return (
        <Card>
            {wordLists}
        </Card>

    )
}

export default WordList;