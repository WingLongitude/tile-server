tile-server
====================

This project is a tile server based on [Windshaft](https://github.com/CartoDB/Windshaft/) that is supposed to project points in a map that represent the position of a given species occurrence record. Currently, this module is being used by the [explorer project](https://github.com/WingLongitude/explorer) and is responsible for the projection of the points in the map.

Install

-------
```
npm install
```

Note on Windshaft version
-------------------------
The 'tile-server' is using a fixed version of Windshaft: 0.40.0
Starting at version 0.41.0, the API endpoints changed and the client code of this tile server should be rewritten.
See [note](https://github.com/CartoDB/Windshaft/blob/master/NEWS.md#version-0410) from CartoDB.
