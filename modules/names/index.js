'use strict';

// var seneca = require('seneca')();

exports.plugin = {
    pkg: require('./package.json'),
    register: async function (server, options) {
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
    }
};
