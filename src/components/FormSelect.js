import React, { Component}  from 'react';
import { Select } from 'reactstrap';

const FormSelect = (props) => {
    return(		
		<option value="" disabled>{props.placeholder}</option>
		{props.options.map(option => {
			return (
				<option
					key={option}
					value={option}
					label={option}>{option}
				</option>
			);
		})}
    )
}

export default FormSelect;