'use strict';
// /**
//  * Admin Routes.
// Author Name: Shobha Tripathi
//  */
var sleep     = require('sleep');
var crypto    = require('crypto');

module.exports = function(app, router) {
	//To test the server performance 
    router.get('/loadtest', function (req, res) {
     //CPU intensive task 
     	let randSleep = Math.round(10000 + (Math.random() * 10000));
        sleep.usleep(randSleep);
        let arrSize = Math.round(5000 + (Math.random() * 4000));
        crypto.createHmac('sha256', 'secret').update(new Array(arrSize).fill('a').join('.')).digest('hex')
        res.send(200);
    });
    
    router.get('/routeCheck', function(req, res) {
         res.send("route check");
    });

};