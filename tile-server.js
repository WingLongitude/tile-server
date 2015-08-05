var Windshaft = require('windshaft');
var _ = require('underscore')._;
var fs = require('fs');
var userConfig = require('./config.json');

// Configure pluggable URLs
// =========================
// The config object must define grainstore config (generally just postgres connection details), redis config,
// a base url and a function that adds 'dbname' and 'table' variables onto the Express.js req.params object.
// In this example, the base URL is such that dbname and table will automatically be added to the req.params
// object by express.js. req2params can be extended to allow full control over the specifying of dbname and table,
// and also allows for the req.params object to be extended with other variables, such as:
//
// * sql - custom sql query to narrow results shown in map)
// * geom_type - specify the geom type (point|polygon) to get more appropriate default styles
// * cache_buster - forces the creation of a new render object, nullifying existing metatile caches
// * interactivity - specify the column to use in the UTFGrid interactivity layer (defaults to null)
// * style - specify map style in the Carto map language on a per tile basis
//
// the base url is also used for persisiting and retrieving map styles via:
//
// GET  base_url + '/style' (returns a map style)
// POST base_url + '/style' (allows specifying of a style in Carto markup in the 'style' form variable).
//
// beforeTileRender and afterTileRender could be defined if you want yo implement your own tile cache policy. See
// an example below

// set environment specific variables
global.environment = require('config/settings');

//on startup, read the file synchronously
var cartoCss = fs.readFileSync(__dirname + '/carto.css','utf-8');
var cacheFolder = __dirname + '/tile_cache/';
var config = {
			base_url: '/database/:dbname/table/:table',
			base_url_notable: '/database/:dbname',
			req2params: function(req, callback){
			// no default interactivity. to enable specify the database column you'd like to interact with
			req.params.interactivity = null;

			// this is in case you want to test sql parameters eg ...png?sql=select * from my_table limit 10
			req.params =  _.extend({}, req.params);
			 _.extend(req.params, req.query);

			 // send the finished req object on
			 callback(null,req);
        },
        grainstore: {datasource: {user:userConfig.database.user,password:userConfig.database.password, host: '127.0.0.1', port: 5432},
        	styles: {point: cartoCss}, mapnik_version:'2.1.0'
		}, //see grainstore npm for other options
        redis: {host: '127.0.0.1', port: 6379},
		mapnik: {
			metatile: 1,
			bufferSize:64
		},
		renderCache: {
			ttl: 60000, // seconds
		}
    };

// Initialize tile server on port 4000
var ws = new Windshaft.Server(config);
ws.listen(4000);
console.log("map tiles are now being served out of: http://localhost:4000" + config.base_url + '/:z/:x/:y.*');

// Specify .png, .png8 or .grid.json tiles.
