'use strict';
const Glue = require('glue');
const manifest = require('./config/manifest.json')

const options = {
    relativeTo: __dirname + '/modules',
};

 Glue.compose(manifest, options, (err, server) => {
     if (err) {
         throw err;
     }

     server.start((err) => {
         if (err) {
             throw err;
         }

         server.log('info', 'Server running at: ' + server.info.uri);
     });
 })

