window.ipython = window.ipython || {};

var proxy = require("ipython-notebook-proxy");
var path = require('path');

ipython.init = function(argv, callback) {

	var pattern = /--notebook=((\/|\\\\).*)*/;
	var filepath = pattern.exec(argv[0]);
	var dirname = path.dirname(filepath[1]);

	if (dirname) {
		var urlpath = "inotebook";
		var port = 10001;
		console.log("Opening file : " + dirname);
		proxy.start(dirname, urlpath, port);
	}


	win.on('closed', function() {
		console.log("Stoping server");
		proxy.stop_all();
	});

	callback(urlpath, port);
};