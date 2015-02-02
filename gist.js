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
		var rInput = document.createElement('input');
		rInput.setAttribute('type', 'radio');
		a.href = arr[i].html_url;
		
		
		//dd.appendChild(document.createTextNode(arr.list[i].language));
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
	
	
//Global HTML Object	
function Object(params) {
  this.name = params.name;
  this.description = params.description;
  this.html_url = params.html_url	
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
	var gistArray = new Array();
	
	
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
					desc = "[WARNING] No Description Found!";
				}
				
				for (var prop in gist[i].files) 
				{
					for (var subProp in gist[i].files[prop])
					  if (subProp === 'language')
					  {
						var lang = gist[i].files[prop][subProp];
					  }
				}
				
				if (lang === undefined || !(lang))
				{
					lang = "Language is not Recognized";
				}

				var gistObj = new Object({
				    language: lang,
                    description: desc,
                    html_url: htmlUrl});
				
				gistArray.push(gistObj);
					 
			
			}
			
			
			deleteGistList(gistArray)
			createGistList(gistArray);
		
		}
	}
	
	request.open('GET', url);
	request.send();
	//}
	
}
	

