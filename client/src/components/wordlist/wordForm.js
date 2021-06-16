import Modal from "../modal/modal";
import classes from './wordForm.module.css';
import {Button} from '@material-ui/core'
import { useRef, useState } from "react";
import axios from 'axios';
import { useDispatch} from "react-redux";
import {wordAction} from '../../store/wordSlice';

const WordForm = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');
    const [isErr, setIsErr] = useState(false);
    
    const dispach = useDispatch();
    const wordRef = useRef();
    
    const formSubmitHandler = async(e) => {
        e.preventDefault();
        
        const enteredWord = wordRef.current.value;

        if(enteredWord.length!==0 && !isErr){
            setIsLoading(true);
            axios({
                method: 'GET',
                url: `/api/v1/oxford/${enteredWord}`
            }).then(res => {
                
                if(res.data.status === 'success'){
                    setIsLoading(false);
                    props.hideForm();
                    dispach(wordAction.setIsWordAdded(true));
                }
            });
        } else{
            setErr('Please Enter a word');
            setIsErr(true);
        }
    }
   
    return (
        <Modal onClick={props.hideForm}>
            <h2 className={classes.header}>Add to dictionary</h2>
            {isErr && <h4 style={{color: 'red'}}>{err}</h4>}
            {!isLoading && <form className={classes.form} onSubmit={formSubmitHandler}>
                <div className={classes.control}>
                    <label>Add here</label>
                    <input type='text' placeholder='Type word' ref={wordRef}/>
                </div>
                
                <div >
                    <Button color="primary" type='submit' >Add</Button>
                    <Button color="secondary" onClick={props.hideForm}>Cancel</Button>
                </div>
            </form>}
            {isLoading && <h4>Adding...</h4>}
        </Modal>
    )
}

export default WordForm;