window.onload = function() {

};

var settings = null;

/*Gist List Creation*/

//Gist Object


function createGistList(){
	
	var ul = document.getElementById("gistList");		 
	 
	var li = document.createElement("li"); 

	
	li.appendChild(document.createTextNode("test"));
	ul.appendChild(li);
	
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
	
	
	

	//for ( var i = 1; i < pNum; i++)
	//{
	
	var pNum = document.getElementsByName('pageNum');
	var request = new XMLHttpRequest(); // request created
	if(!request){
		throw 'Request Failed';
	}
	var url = 'https://api.github.com/gists'; //url initialized
	var params = {
	  page: pNum //page number
	};
	
	url += '?' + makeString(params); //new url created
	
	//Create JSON OBJECT
	request.onreadystatechange = function(){
		if(this.readyState == 4){
			var obj1 = this.responseText;
			var gist = JSON.parse(this.responseText) // gist JSON object 
			
			for (var obj1 in gist)
			{
				var desc = gist.description; //object properties
				var lang = gist.language;
				//createGistList();
			}
			
			
		
		}
	}
	
	request.open('GET', url);
	request.send();
	//}
	//window.location= url;
}
	

