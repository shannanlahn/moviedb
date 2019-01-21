import React, { Component}  from 'react';
import { Button } from 'reactstrap';

const FormButton = (props) => {
    //console.log(props.style);
    return(
        <button 
			className={'btn btn-outline-primary'}
            style= {props.style} 
            onClick= {props.action}>    
            {props.title} 
        </button>)
}

export default FormButton;