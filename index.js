'use strict';
const Glue = require('@hapi/glue');
const { server } = require('@hapi/hapi');
const manifest = require('./manifest');
const Manifest = require('./manifest');

const options = {
    relativeTo: __dirname + '/modules',
};

const startServer = async function () {
    try {
        const server = await Glue.compose(manifest, options);
        await server.start();
        console.log('info', 'Server running at: ' + server.info.uri);
    }
    catch (err) {
        console.log(err)
        process.exit(1);
    }
};

startServer();
