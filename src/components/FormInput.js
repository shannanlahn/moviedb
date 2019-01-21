import React, { Component}  from 'react';
import { Input } from 'reactstrap';

const FormInput = (props) => {
    return (  
   
   
    <input
      className="form-control"
      id={props.name}
      name={props.name}
      type={props.type}
      value={props.value}
      onChange={props.handleChange}
      placeholder={props.placeholder} 
    />
)}

export default FormInput;