import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
//import Rating from '../components/Rating'

class CategoryOptions extends Component {
    constructor() {
        super();
        this.state = {
            rating: [],
			selected: '',
			error: ''
        };
		this.handleChange = this.handleChange.bind(this);
    }
	
	/* Get ratings from php/db */
	componentDidMount() {
		let h = new Headers();
		let req = new Request( 'http://localhost:80/app/filter_ratings.php',{ 
			headers: h, 
			method: 'POST',
			body: JSON.stringify({data: this.state.rating})
		});

		fetch(req)
			.then(response => {
				return response.json();
			}).then(data => {
				let ratings = data.map( r => { 
					return {value: r.rating, display: r.rating} 
				});
				this.setState({ rating: [{value: '', display: 'Rating'}].concat(ratings) });				
				
			}).catch(e => {
				this.setState({ error:e });
			});
	}
	
	handleChange(e){		
		let newState = e.target.value;		
		this.setState({ selected: newState });
		this.props.handleChange(newState);
	 }


	/* returns HTML ready select option */
	render() {
		return (
			<select
				className = {'custom-select mr-sm-2'}
				name={'rating'}
				id={'rating'}
				value = {this.state.selected}
				placeholder = {'Rating'}						
                onChange={ this.handleChange } 
			>				
				{this.state.rating.map((r) => 
					<option  key={r.value} value={r.value}>{r.display}</option>
				)}
			</select>		
		);
	}

}

export default CategoryOptions;