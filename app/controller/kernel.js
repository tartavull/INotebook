window.ipython = window.ipython || {};

var proxy = require("ipython-notebook-proxy");
var path = require('path');
var portfinder = require('portfinder');
var fs = require('fs');
var gui = require('nw.gui');
var win = gui.Window.get();

ipython.init = function(argv, callback) {

	portfinder.getPort(function(err, port) {

		var filename = "";
		var urlpath = "inotebook";
		var dirname = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];

		var home = true;
		if (argv.length > 0) {
			var pattern = /--notebook=((\/|\\\\).*)*/;
			var filepath = pattern.exec(argv[0]);
			if (filepath[1]) {
				if (fs.lstatSync(filepath[1]).isFile()) {

					var dirname = path.dirname(filepath[1]);
					var filename = path.basename(filepath[1]);
					urlpath = urlpath + "/notebooks/" + filename + "#";

			
					win.maximize();
				}
			}
		}


		proxy.start(dirname, "inotebook", port);

		win.on('closed', function() {
			console.log("Stoping server");
			proxy.stop_all();
		});

		callback(urlpath, port);

	});
};