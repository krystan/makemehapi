'use strict';
const Boom = require('boom');

exports.register = function (server, options, next) {

    server.seneca.add({getData: 'data', name: 'name'}, function (message, input) {
        var db = server.plugins['hapi-mongodb'].db;

        db.collection('contacts').findOne({"name": message.name}, function (err, result) {
            if (err) return input(Boom.internal('Internal MongoDB error', err));
            input(null, result);
        });
    });

    server.route([
        {
            path: '/data/{name}',
            method: 'GET',
            config: {
                handler: require('./version'),
                description: 'Get data for specific Name from Mongo',
                notes: 'Returns Data for specific Name from MongoDB'
            }
        },
        {
            path: '/{apiVersion}/data/{name}',
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