'use strict';

module.exports =  function (request, reply) {
    
    request.seneca.act({getNames: 'names'}, function (err, result) {
        if (err) {
            return reply(err);
        }

        return reply(result.names);

    });
};