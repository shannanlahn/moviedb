import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';

class CategoryOptions extends Component {
    constructor( ) {
        super( );
        this.state = {
            category: [],
			selected: '',
			error: ''
        };
		this.handleChange = this.handleChange.bind(this);
    }
	
	/* Get ratings from php/db */
	componentDidMount() {
		let h = new Headers();
		let req = new Request( 'http://localhost:80/app/filter_category.php',{ 
			headers: h, 
			method: 'POST',
			body: JSON.stringify({data: this.state.category})
		});

		fetch(req)
			.then(response => {
				return response.json();
			}).then(data => {
				let categories = data.map( category => { 
					return {value: category.category_id, display: category.name} 
				});
				this.setState({ category: [{value: '', display: 'Category'}].concat(categories) });
				
			}).catch(e => {
				this.setState({ error:e });
			});
	}

	handleChange(e){
		
		let newState = e.target.value;		
		this.setState({ selected: newState });
		this.props.handleChange(newState);
		return;
	 }
	
	/* returns HTML ready select option */
	render() {
		return (
			<select
				className = {'custom-select mr-sm-2'}
				name={'category'}
				id={'category'}
				value = {this.state.selected}
				placeholder = {'Category'}						
                onChange={ this.handleChange } 
			>					
				{this.state.category.map((cat) => 
					<option  key={cat.value} value={cat.value}>{cat.display}</option>
				)}
			</select>		
		);
	}

}

export default CategoryOptions;