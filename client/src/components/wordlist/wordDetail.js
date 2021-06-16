import Card from "../UI/Card";
import { useParams } from 'react-router-dom'
import classes from './WordDetail.module.css';
import { useEffect, useState, Fragment } from "react";
import axios from "axios";

const WordDetail = () => {
    const [word, setWord] = useState();
    const params = useParams();
    const { id } = params;
    useEffect(() => {
        const fetchWord = async function () {
            const wordById = await axios({
                method: 'GET',
                url: `/api/v1/word/${id}`
            });
            setWord(wordById.data.word);
           
        }
        fetchWord();
    }, [id]);

    let egList;
    if(word && word.description[0].entries[0].senses[0].examples){
        egList= word.description[0].entries[0].senses[0].examples.map((eg, i) => <li key={i}>{eg.text}</li>);
    }

    return (
        <Fragment>
            {word && <Card >
                <div className={classes.word}>
                    <h1>{word.word}</h1>
                    <p>({word.description[0].lexicalCategory.text})</p>
                    <p>{word.description[0].entries[0].senses[0].definitions[0]}</p>
                    <ul>
                        {egList}
                    </ul>
                    
                </div>
            </Card>}
        </Fragment>
    )
}

export default WordDetail;