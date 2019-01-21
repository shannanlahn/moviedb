import React, {Component, Fragment} from 'react';  
import ReactDOM from 'react-dom';


class MovieListContainer extends Component {  
	constructor(props) {
		super(props);

		this.state = {
			data: {
				movies: [],
				actors: []
			},
			movieCountMessage: []
		}	
		this.renderMovieHeaders = this.renderMovieHeaders.bind(this);
		this.renderMovies 		= this.renderMovies.bind(this);
		this.renderActors 		= this.renderActors.bind(this);
	}
	
	/* pull in movie data from parent */
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.data !== this.props.data) {
	
			let msg = [];
			this.setState( prevState => ({ data : 
				{...prevState.data, movies: this.props.data.movies
				}
			}));
			
			this.setState( prevState => ({ data : 
				{...prevState.data, actors: this.props.data.actors
				}
			}));			
			
			//check if there are results and update message
			if(this.props.data.movies){
				msg.push(<Fragment key="msg"><span>We found {Object.keys(this.props.data.movies).length} movies for you.</span></Fragment>);
				
				this.setState(prevState => ({   
					movieCountMessage:  msg
				}), () => console.log(this.state.movieCountMessage) )
			}else{
				msg.push(<Fragment key="msg"><span>We were unable to find any movies for you.</span></Fragment>);
				
				this.setState(prevState => ({   
					movieCountMessage:  msg
				}), () => console.log(this.state.movieCountMessage) )
			}
		}
		
	}
 
	/*build table heading */
	renderMovieHeaders() {
		
		return (
			<Fragment>
				<div className="row" id="table-header">
					<div className="col-1 bg-info"></div>
					<div className="col-5 bg-info"> Title &amp; Description </div>
					<div className="col-3 bg-info"> Actors</div>
					<div className="col-1 bg-info"> Rating </div>
					<div className="col-1 bg-info"> Category</div>
					<div className="col-1 bg-info"> Year</div>
				</div>
			
			</Fragment>
		);
	}

	/*build table with movie data */
	renderMovies() {
		
		let tableBody = [];
		let count = 0;
		let film_id = 0;
		let actors = [];		
		
		this.state.data.movies.forEach(function(row) {
			++count;
			let bgcolor = count%2==0 ? "bg-light" : "bg-white";	
			film_id = row.film_id;
			let actors = this.renderActors(film_id);
			
			tableBody.push(
				<Fragment key={film_id}>
					<div className={"row " + bgcolor}>
						<div className="col-1"> {count}</div>
						<div className="col-5"> 
							<b>{row.title}</b><br />
							{row.description} 
						</div>
						<div className="col-3">{actors}</div>
						<div className="col-1">{row.rating}</div>
						<div className="col-1">{row.name}</div>
						<div className="col-1">{row.release_year}</div>
					</div>
				</Fragment>	
			);

		}.bind(this));	
		
		return tableBody;		
	}	
	
	/* build out actor section for table */
	renderActors( id ){
		
		let actorArr = this.state.data.actors;
		let actors = actorArr.filter( actor => actor.film_id === id);
		let movieActors = [];
		let count = 0;
		actors.forEach(function(row) {
			++count;				
	
			movieActors.push(				
					<Fragment key={id + "-" + count}>
						<span>{row.first_name} {row.last_name} </span><br/>
					</Fragment>								
			)
		});	
		
		return movieActors;
	}

	render() {		
		
		let count 		= 0;
		let tableHeader = "";
		let tableBody 	= "";			
			
		if(this.state.data.movies){
			count = Object.keys(this.state.data.movies).length;			
			if(count > 0){			
				tableHeader = this.renderMovieHeaders();
				tableBody 	= this.renderMovies(  );				
			}	
		}
			
			
		return(		
			<Fragment>
				<div className="row" id="table-content">
					<div className="col-2">
						&nbsp;
					</div>
					<div id="display-results" className="col-10">
						{ this.state.movieCountMessage }
					</div>
				</div>
			
				<div className="row" id="table-data">
					<div className="col">
						&nbsp;
					</div>
					<div id="display-results" className="col-10">
						{ tableHeader }
						{ tableBody  }
					</div>
					<div className="col">
						&nbsp;
					</div>
				</div>
			</Fragment>
			
		);
	}
}

export default MovieListContainer;