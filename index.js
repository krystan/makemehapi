'use strict';
const Glue = require('glue');
const Pack = require('./package');

 const manifest = {
     connections: [{
         port: 3000,
         labels: ["api"],
         routes: {cors: true}}],
     registrations: [
         {
             plugin: {
                 register: 'good',
                 options: {
                     reporters: [{
                         reporter: require('good-console'),
                         events: {
                             response: '*',
                             log: '*'
                         }
                     }]
                 }
             }
         },
         {
             plugin: {
                 register: 'inert',
                 options: {select: 'api', options: {}}
             }
         },
         {
             plugin: {
                 register: 'vision',
                 options: {}
             }
         },
         {
             plugin: {
                 register: 'hapi-swagger',
                 options: {info: {title: "My Api", version: Pack.version}, tags: [{name: 'api'}]}
             }
         },
         {
             plugin: {
                 register: 'chairo',
                 options: {}
             }
         },
         {
             plugin: {
                 register: './names',
                 options: {}
             }
         }
     ]
 };

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

