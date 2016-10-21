'use strict';

function Store(){
	this.localStoreSupport();
}
Store.prototype.localStoreSupport = function(){
	if (window.localStorage) {
		var test = "__localstoragetest__";
		try {
			window.localStorage.setItem(test, test);
			window.localStorage.removeItem(test);
		} catch(ex) {
			console.log("No storage for you!");
			this.support = false;
			return false;
		}
		this.support = true;
		return true;
	}
	this.support = false;
	return false;
}
Store.prototype.setItem = function(name,value,days){
	if (days){
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else {
		var expires = "";
	}
	if(this.support){
		localStorage.setItem(name, value);
	}
	else {
		document.cookie = name+"="+value+expires+"; path=/";
	}
}
Store.prototype.getItem = function(name) {
	if(this.support){
		return localStorage.getItem(name);
	}else{
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}
}
Store.prototype.removeItem = function(name){
	if(this.support){
		localStorage.removeItem(name);
	}
	else{
		this.set(name,"",-1);
	}
}

window.store = new Store();