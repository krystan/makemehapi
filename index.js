'use strict';

const Chairo = require('chairo');
const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');
const Good = require('good');
const server = new Hapi.Server();

server.connection({port: 3000, routes: {cors:true}});

server.register({ register: Chairo}, function(err) {
    let id = 0;
    server.seneca.add({generate: 'id'}, function(message, next) {
        return next(null, {id: ++id});
    });

    server.seneca.add({getNames: 'names'}, function(message, input) {
        return input(null, {
           names: [{'fullname': 'krystan honour'}, {'name' : 'joanna Honour'}]
        });
    });
});

// routes

server.route({
    method: 'GET',
    path: '/names',
    config: {
        handler: function (request, reply) {
            request.seneca.act({getNames: 'names'}, function (err, result) {
                if (err) {
                    return reply(err);
                }

                return reply(result.names);

            })
        },
        description: 'Get list of names',
        notes: 'Returns a list of names given arguments',
        tags: ['api']
    }
});


server.route({
    method: 'GET',
    path: '/',
    config: {
        handler: function (request, reply) {
            request.seneca.act({generate: 'id'}, function (err, result) {
                if (err) {
                    return reply(err);
                }
                return reply('Hello world! ' + result.id);
            });
        },
        description: 'Get hello world',
        notes: 'Returns a standard hello world response with a counter',
        tags: ['api']
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: function(request, reply) {
        reply('Hello, ' + encodeURI(request.params.name) + '!');
    }
});

// register swagger, move to glue
server.register([
    Inert,
    Vision,
    {
        register: HapiSwagger,
        options: {
            info: {
                'title': 'Test API Documentation',
                'version': Pack.version
            }
        }
    }]
);

// start server and log
server.register({
    register: Good,
    options: {
        reporters: [{
            reporter: require('good-console'),
            events: {
                response: '*',
                log: '*'
            }
        }]
    }
}, (err) => {

    if (err) {
        throw err; // something bad happened loading the plugin
    }

    if (!module.parent) {
        server.start((err) => {
            if (err) {
                throw err;
            }
            server.log('info', 'Server running at: ' + server.info.uri);
        });
    }
});

module.exports = server;