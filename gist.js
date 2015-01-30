window.onload = function() {

};

var settings = null;

/*Gist List Creation*/

//Gist Object


function createGistList(ul, lang){
	
	
	
	
}


/*AJAX Section*/


function makeString(obj){
	var str = [];
	for (var prop in obj){
		var g = encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop]);
		str.push(g);
	}
	return str.join('&');
}

function search(){
	
	
	//var pNum = document.getElementsByName('pageNum');

	//for ( var i = document.getElementsByName('pageNum'); i > 0; i--)
	//{
	var request = new XMLHttpRequest(); // request created
	if(!request){
		throw 'Request Failed';
	}
	var url = 'https://api.github.com/gists'; //url initialized
	var params = {
	  page: document.getElementsByName('pageNum') //page number
	};
	
	url += '?' + makeString(params); //new url created
	
	//Create JSON OBJECT
	request.onreadystatechange = function(){
		if(this.readyState == 4){
			var gist = JSON.parse(this.responseText) // gist JSON object 
			var language = null; //object properties
			
			//createGistList(document.getElementById('gistList'));
		
		}
	}
	
	request.open('GET', url);
	request.send();
	//}
	//window.location= url;
}
	

