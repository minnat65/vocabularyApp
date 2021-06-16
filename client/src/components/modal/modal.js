
import {Fragment} from 'react';
import ReactDOM from 'react-dom';

import classes from './modal.module.css';

const Backdrop = props => {
    return <div onClick={props.onClose} className={classes.backdrop}></div>
}
const ModalOverlays = props => {
    return <div className={classes.modal}>
        <div>{props.children}</div>
    </div>
}
//where to portal(published)
const portalElement = document.getElementById('overlays');

const Modal = (props) => {

    return(
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClose ={props.onClick}/>, portalElement)}
            {ReactDOM.createPortal(<ModalOverlays>{props.children}</ModalOverlays>, portalElement)}
        </Fragment>
    )
}

export default Modal;