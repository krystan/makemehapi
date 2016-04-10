'use strict';
const Boom = require('boom');

exports.register = function (server, options, next) {

    server.seneca.add({getData: 'data', name: 'name'}, function (message, input) {
        var db = server.plugins['hapi-mongodb'].db;

        db.collection('contacts').findOne({"name": message.req$.params.name}, function (err, result) {
            if (err) return input(Boom.internal('Internal MongoDB error', err));
            input(null, result);
        });
    });

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
                handler: require('./version/getAll'),
                description: 'Get data from Mongo',
                notes: 'Returns Data from Mongo DB',
            }
        },
        {
            path: '/{apiVersion}/data',
            method: 'GET',
            config: {
                handler: require('./version/getAll'),
                description: 'Get data from Mongo',
                notes: 'Returns Data from MongoDB',
                tags: ['api']
            }
        },
        {
            path: '/data/{name}',
            method: 'GET',
            config: {
                handler: require('./version/getOne'),
                description: 'Get data for specific Name from Mongo',
                notes: 'Returns Data for specific Name from MongoDB'
            }
        },
        {
            path: '/{apiVersion}/data/{name}',
            method: 'GET',
            config: {
                handler: require('./version/getOne'),
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