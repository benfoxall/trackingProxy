// A wrapper around the tracking proxy - you might call it a 'proxy proxy'... requires JQuery

(function(window, $){

	var tProxy = function(){
		var _endpoint;
		
		return {
			init: function(endpoint){
				//check for trailing slash
				if(!endpoint.match('/$')){
					endpoint += '/';
				}
				_endpoint = endpoint;
				return this;
			},
			url: function(u){
				var mtch = u.match('(https?://)(.*)');
				if(mtch){
					return _endpoint + mtch[2];
				} else {
					return false;
				}
			},
			fetchURLs: function(callback){
				return $.getJSON(_endpoint + '_', callback);
			}
		};
		
	};
	
	
	var current;
	
	window.TProxy = {
		init: function(endpoint){
			current = tProxy().init(endpoint);
			return current;
		},
		url: function(u){
			return current.url(u);
		},
		fetchURLs: function(callback){
			return current.fetchURLs(callback);
		}
	}
	
	
	
	
})(window, jQuery);