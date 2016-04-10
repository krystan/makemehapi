'use strict';
const Glue = require('glue');
//const manifest = require('./config/manifest.json')
const Manifest = require('./manifest');


const options = {
    relativeTo: __dirname + '/modules',
};

Glue.compose(Manifest, options, (err, server) => {
     if (err) {
         throw err;
     }

     server.start((err) => {
         if (err) {
             throw err;
         }

         server.log('info', 'Server running at: ' + server.info.uri);
     });
});

