
import { Link } from 'react-router-dom'
import classes from './word.module.css';

const Word = (props) => {
    return (

        <Link to={`/word/${props.id}`} className={classes.word}>
            <h3>{props.word}</h3>
            <span>({props.description})</span>
            <p>{props.definition}</p>
            <hr />
        </Link>

    )
}

export default Word;