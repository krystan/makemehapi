'use strict';

module.exports = function (request, h) {
    // Versioned by URI route
    if (request.params.apiVersion && (/^v[0-9]+$/).test(request.params.apiVersion)) {
        return require('./' + request.params.apiVersion)(request, h);
    }

    // Versioned by customer request header
    if (request.headers['api-version'] && (/^[0-9]+$/).test(request.headers['api-version'])) {
        return require('./v' + request.headers['api-version'])(request, h);
    }

    // Versioned by accept header
    if (request.headers['accept'] && (/^application\/vnd\.namesapi\.v[0-9]+$/).test(request.headers['accept'])) {

        var version = request.headers['accept'].replace('application/vnd.namesapi.', '');

        return require('./' + version)(request, h);
    }

    // Default gets original API, to be backwards compatible
    return require('./v1')(request, h);
};
