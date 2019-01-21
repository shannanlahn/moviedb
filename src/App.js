import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import FormContainer from './containers/FormContainer';
import MovieListContainer from './containers/MovieListContainer';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		};
		this.handleMovieInfo = this.handleMovieInfo.bind(this);
	}
	
	handleMovieInfo( movieData ) {

		this.setState(prevState => ({    
            data: movieData
			})
		);		
	}
		
	render() {
		return (	
	
		  <div className="App"> 
			<div className="container">
				<h3 className="display-4">A React Movies Finder App</h3>
				<div className="row">
					<div className="col">
						<div></div>
					</div>
					<div className="col-8">
						
						<FormContainer							 
							handleMovieInfo = {(movieData) => this.handleMovieInfo( movieData ) }
						/>	
									
					</div>
					<div className="col">
						&nbsp;	
					</div>
				</div>
					
				<div  id="movie-results-container">
					<MovieListContainer 
						data =  {this.state.data}
						refresh = {(movieData) => this.refreshMovies( movieData ) }
					/>
				</div>
			</div>			
		</div>
		);
	}
}

export default App;
