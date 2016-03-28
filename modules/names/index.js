'use strict';

exports.register = function (server, options, next) {
    server.seneca.add({getNames: 'names'}, function(message, input) {
        return input(null, {
            names: [{'fullname': 'krystan honour'}, {'name' : 'joanna Honour'}]
        });
    });

    server.route({
        path: '/names',
        method: 'GET',
        config: {
            handler: require('./version'),
            description: 'Get list of names',
            notes: 'Returns a list of names given arguments',
        }
    });

    server.route({
        path: '/{apiVersion}/names',
        method: 'GET',
        config: {
            handler: require('./version'),
            description: 'Get list of names',
            notes: 'Returns a list of names given arguments',
            tags: ['api']
        }
    });

    next();

};

exports.register.attributes = {
    pkg: require('./package.json')
};