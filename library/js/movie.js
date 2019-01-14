var movie = {
	init: function(){
		movie.buildCategoryFilter();
		movie.buildRatingsFilter();
		

		$("#btn-submit").click(function(event){				 		

			if(movie.isValid()){
			
				const formData = $("#movieQueryForm").serialize();

				$.ajax( {
					url: "movie.php",
					type: "post",
					data: formData,
					success: function(data) {	
										
						movie.displayMovies(data['movies'], data['actors']);												
					},
					error: function (jqXHR, status, err) {
						$('#display-info').html( "Your search did not return any movies.");
						$("#display-results").html("");
					}
				});
			}					
		});
		
	},
	
	//validate search field entry for alphanumeric entry
	isValid: function(){
	
		const movieTitleReg = /^[0-9A-Za-z]+$/;
		const input = $("#movieTitle").val();
		
		$('#errMsg').hide();
		
		if(input == ""){
			$('#errMsg').html("Uh oh! Please enter something I can search with.");
			$('#errMsg').show();
			return false;
		}else if(!movieTitleReg.test(input)){
			$('#errMsg').html("OOPS.  Something went wrong. Please enter a valid movie title.");
			$('#errMsg').show();
			return false;
		}
		
		return true;	
	},
	
	//display results from php/ajax call 
	displayMovies: function( movieArray, actorArray){
		const view = $("#display-results");
		let count = 0;
		
		let thisTitle = '';
		let hdrHtml = '<div class="row"><div class="col-1 bg-info"></div><div class="col-5 bg-info" > Title &amp; Description </div><div class="col-3 bg-info">Actors</div>' ;
		hdrHtml += '<div class="col-1 bg-info" > Rating </div><div class="col-1 bg-info">Category</div><div class="col-1 bg-info">Year</div></div>' ;

		view.html( hdrHtml );		
		
		$.each(movieArray, function(index, item) {
				//console.log(item.title);
				++count;
				
				let bg_color = count%2==0 ? "bg-light" : "bg-white";	

				let thisHtml = '<div class="row"><div class="col-1 '+bg_color+'">'+count+'</div>';
				thisHtml += '<div class="col-5 '+bg_color+'" > <b>' + item.title + '</b><br>';
				thisHtml += item.description +'</div><div class="col-3 '+bg_color+'">';
			
				//make a copy by value of array, then filter out unwanted values to build actor list
				//without losing values from origina array
				let actorArr = actorArray.slice();
				let actors = actorArr.filter( actor => actor.film_id === item.film_id);
				
				//loop through filtered list and output actors
				$.each(actors, function(aIndex, aItem){
					thisHtml += aItem.first_name + " " + aItem.last_name + "<br>";
				});
				 
				thisHtml += '</div><div class="col-1 '+bg_color+'" >' + item.rating + '</div>';
				thisHtml += '<div class="col-1 '+bg_color+'" >' + item.name + '</div>';
				thisHtml += '<div class="col-1 '+bg_color+'">' + item.release_year + '</div></div>' ;
									
				view.append( thisHtml );
			}												
		);	
		
		$('#display-info').html( "We found " + count + " movie(s) for you.");
	},


	//get sql data to build the category dropdown 
	buildCategoryFilter: function(){
		$.ajax( {
			url: "filter_category.php",
			success: function(data) {
				$.each(data, function(index, item) {
					$('<option>').val( item.category_id ).text( item.name ).appendTo('#select-category');
				});
			}
		});
	},

	//get sql data to build the ratings filter
	buildRatingsFilter: function(){
		$.ajax( {
			url: "filter_ratings.php",
			type: "post",
			success: function(data) {
			
				$.each(data, function(index, item) {
					$('<option>').val( item.rating ).text( item.rating ).appendTo('#select-rating');
										
				});
			}
		});
	}
	
}

$( document ).ready( movie.init );
