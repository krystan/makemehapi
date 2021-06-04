'use strict';

exports.plugin = {
    pkg: require('./package.json'),
    register: async function (server, options) {

        server.route({
            path: '/health',
            method: 'GET',
            config: {
                handler: require('./version'),
                description: 'Health check point',
                notes: 'Used to check the api is up',
                tags: ['api']
            }
        });

        server.route({
            path: '/{apiVersion}/health',
            method: 'GET',
            config: {
                handler: require('./version'),
                description: 'Health check point',
                notes: 'Returns ok',
                tags: ['api']
            }
        });
    }
};
