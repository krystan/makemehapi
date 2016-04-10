'use strict';

module.exports = function (request, reply) {

    request.seneca.act({getData: 'data', name: 'name'}, function (err, result) {
        if (err) {
            reply(err);
        }
        reply(result);
    });
};