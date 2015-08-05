module.exports.oneDay   = 86400000;

module.exports.postgres = {
    user: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    geometry_field: 'the_geom',
    srid: 4326
};

module.exports.mapnik_version = undefined; // will be looked up at runtime if undefined
module.exports.windshaft_port = 8080;
module.exports.enable_cors = true;