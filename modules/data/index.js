'use strict';
const Boom = require('@hapi/boom');

exports.plugin = {
    pkg: require('./package.json'),
    register: async function (server, options) {
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
    }
};
