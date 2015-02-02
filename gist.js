/*Sources: MDN on for in loops and "Getting Started with Ajax",
the module videos for basic layout of my page and stack overflow for creating/appending objects
*/

window.onload = function() {

};

var settings = null;

/*Gist List Creation*/

//Gist Object


function createGistList(arr){
	
	var dl = document.getElementById("gistList");		 
	for (var i = 0; i < arr.length; i++)
	{
	var dt = document.createElement("dt"); 
	var dd = document.createElement("dd");
	var a = document.createElement('a');
	a.href = arr[i].html_url;
	
	
	dd.appendChild(document.createTextNode(arr[i].files.language));
	a.appendChild(document.createTextNode(arr[i].description));
	dt.appendChild(dd);
	dt.appendChild(a);
	dl.appendChild(dt);
	}
	
}

function deleteGistList(arr){
	
	var dl = document.getElementById("gistList");		 
	for (var i = 0; i < arr.length; i++)
	{
	var dt = document.createElement("dt"); 
	var dd = document.createElement("dd");
	var a = document.createElement('a');
	var del = document.createElement('del');
	a.href = arr[i].html_url;
	
	dl.appendChild(del);
	}
	
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
	
	
	var pNum = document.getElementsByName('pageNum');
	var gistArray = new Array(pNum);
	
	
	//for ( var i = 0; i < pNum; i++)
	//{
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
			var gist = JSON.parse(this.responseText) // gist JSON object 
			for (var i = 0; i < gist.length; i++) //setting object properties
			{
				for (var prop in gist[i])
				{
					if (prop === 'html_url')
					{
						var htmlUrl = gist[i].html_url;
					}
					
					if (prop === 'description')
					{
						var desc = gist[i].description;
					}
				}

				if (!(desc) || desc == 'null')
				{
					gist[i].description = "[WARNING] No Description Found!";
				}
				
				for (var prop in gist[i].files) 
				{
				for (var subProp in gist[i].files[prop])
				  if (subProp === 'language')
				  {
					var language = gist[i].files[prop][subProp];
				  }
				}				
					 
			
			}
			
			
			deleteGistList(gist)
			createGistList(gist);
		
		}
	}
	
	request.open('GET', url);
	request.send();
	//}
	//window.location= url;
}
	

