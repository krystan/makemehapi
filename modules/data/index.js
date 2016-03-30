'use strict';
const Boom = require('boom');

exports.register = function (server, options, next) {
    server.seneca.add({getData: 'data'}, function (message, input) {

        var db = server.plugins['hapi-mongodb'].db;

        db.collection('contacts').find().toArray(function (err, result) {
            if (err) return input(Boom.internal('Internal MongoDB error', err));
            input(null, result);
        });
    });

    server.route([
        {
            path: '/data',
            method: 'GET',
            config: {
                handler: require('./version'),
                description: 'Get data from Mongo',
                notes: 'Returns Data from Mongo DB',
            }
        },
        {
            path: '/{apiVersion}/data',
            method: 'GET',
            config: {
                handler: require('./version'),
                description: 'Get data from Mongo',
                notes: 'Returns Data from MongoDB',
                tags: ['api']
            }
        }
    ]);

    next();

};

exports.register.attributes = {
    pkg: require('./package.json')
};