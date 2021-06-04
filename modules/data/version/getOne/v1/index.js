const Boom = require('@hapi/boom');

'use strict';

module.exports = async function (request, h) {
    const db = request.mongo.db;

    try {
        const result = await db.collection('contacts').findOne({ name: request.params.name });
        return result;
    }
    catch (err) {
        throw Boom.internal('Internal MongoDB error', err);
    }
};
