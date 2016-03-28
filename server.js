'use strict';

const Chairo = require('chairo');
const Hapi = require('hapi');
const Good = require('good');

const server = new Hapi.Server();
server.connection({port: 3000}, {routes: {cors: true}});

server.register({ register: Chairo}, function(err) {
  // Add action
  let id = 0;
  server.seneca.add({generate: 'id'}, function(message, next) {
    return next(null, {id: ++id});
  });
});

// routes
server.route({
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
      request.seneca.act({generate: 'id' }, function(err, result) {
        if (err) {
          return reply(err);
        }
        return reply('Hello world! ' + result.id);
      });
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: function(request, reply) {
        reply('Hello, ' + encodeURI(request.params.name) + '!');
    }
});

// Static content
server.register(require('inert'), (err) => {
    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/hello',
        handler: function (request, reply) {
            reply.file('./public/hello.html');
        }
    });
})

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

    server.start((err) => {

        if (err) {
            throw err;
        }
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});
