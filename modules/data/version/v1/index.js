'use strict';

module.exports = function (request, reply) {

    request.seneca.act({getData: 'data'}, function (err, result) {
        if (err) {
            reply(err);
        }
        reply(result);

    });

    request.seneca.act({getData: 'data', name: request.params.name}, function (err, result) {
        if (err) {
            reply(err);
        }
        reply(result);
    });
};