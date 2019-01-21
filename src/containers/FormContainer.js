import React, {Component} from 'react';  
import ReactDOM from 'react-dom';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import CategoryOptions from '../components/CategoryOptions';
import RatingOptions from '../components/RatingOptions';

const API_PATH = 'http://localhost:80/app/movie.php';

class FormContainer extends Component {  
	constructor(props) {
		super(props);

		this.state = {
			searchForm: {
				movieTitle: '',
				category: '',		
				rating: ''
			},
			validInput: false,
			errorMessage: null,
			error: ''
			
		}
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.handleSelectChanged = this.handleSelectChanged.bind(this);
		this.validateInput = this.validateInput.bind(this);
	}

	handleSelectChanged(newState, type) {
		
		this.setState( prevState => ({ searchForm : 
			{...prevState.searchForm, [type]: newState
			}
		}), () => console.log(this.state.searchForm))

    }

	handleFormSubmit(e) {
		e.preventDefault();
		
		//validate input field first
		if(this.validateInput() === true){
			
			let movieData = this.state.searchForm;		
			
			let h = new Headers();
			let req = new Request( API_PATH,{ 
				headers: h, 
				method: 'POST',
				body: JSON.stringify(movieData)
			});
			
			//submit form data
			fetch(req)
				.then(response => {				
					return response.json();
				}).then(data => {
					
					this.props.handleMovieInfo( data );
					
					return;
				}).catch(e => {
					this.setState({ error:e });
				});			
		}		
	}	
	
	handleInput(e) {
		let value = e.target.value;
		let name = e.target.name;
		this.setState( prevState => ({ searchForm : 
			{...prevState.searchForm, [name]: value
			}
		}), () => console.log(this.state.searchForm))
	}
	
	validateInput(){		
		
		const movieTitleReg = /^[0-9A-Za-z]+$/;
		let isValid = false;
		let input = Object.keys(this.state.searchForm.movieTitle);
		let testReg = movieTitleReg.test( this.state.searchForm.movieTitle );
		
		
		if (input.length === 0 ){
			this.setState(prevState => ({   
				validInput: false, errorMessage: "--> Please enter something to search on."
			}));
			
		}else if( testReg === false ){
		  this.setState(prevState => ({   
				validInput: false, errorMessage: "--> Please enter only alpha numeric characters."
			}));
		}else{
			this.setState(prevState => ({   
				validInput: true, errorMessage: ""
			}));
			isValid = true;
		}
		
		return isValid;
			
	}	
	
	render() {
		return (
			<form className="container" id="movieQueryForm" onSubmit={this.handleFormSubmit}>
			
				<div className="input-group mb-3">
					<div className="input-group-prepend">
						<span className="input-group-text" id="basic-addon1">Search &gt;</span>
					</div>
					{/* movie title input field */}
					<FormInput type={'text'}
						title= {'Movie Title'} 
						name= {'movieTitle'} 
						value={this.state.searchForm.movieTitle}		
						placeholder = {'Enter a movie title'}
						handleChange = {this.handleInput}				
					/> 
				</div>
				<div className="row">
					<div className="col-4 filter-text">Filter by:</div>
					<div className="col-4  my-1" id="filter-category">
						{/* Category Options select */}
						<CategoryOptions 
							handleChange = {(newState) => this.handleSelectChanged(newState, 'category') }  
						/>													
					</div>				
					<div className="col-4  my-1" id="filter-rating">	
						{/* Rating Options select */}
						<RatingOptions
							handleChange = {(newState) => this.handleSelectChanged(newState, 'rating') }
						/>		
					</div>
				</div>
				<div className="row">
					<div className="col-3">		
						{/* Form submit button */}					
						<FormButton 
							action = {this.handleFormSubmit}
							type = {'primary'} 
							title = {'Get Movies'} 
						/>
					</div>
					<div>
						<span id="errMsg"> {this.state.errorMessage} </span>
					</div>
				</div>
		  </form>
		);
	}
}

export default FormContainer;