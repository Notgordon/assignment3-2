window.onload = function() {
	
}

function search(){
	var request = new XMLHttpRequest();
	var pageNum = document.getElementsByName('pageNum')[0];
	var url = 'https://api.github.com/gists/public';
	var params = {
	
	};
	
	url += '?' + urlStringify(params);
}
	

function makeString(obj){
	var str = []
	for (var prop in obj){
		var s = encodeURIComponent(prop) + '=' encodeURIComponent(obj[prop]);
		str.push(s);
	}
	return str.join('&');
}