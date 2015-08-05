var request = require('request');
var tileserver = require('../tile-server.js');

describe('homepage', function(){
  it('should get 200 from GET on homepage',function(){
    request('http://localhost:4000', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
    });
  });
});