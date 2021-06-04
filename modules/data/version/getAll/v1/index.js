'use strict';

module.exports = async function (request, h) {
    const db = request.mongo.db;

    try {
        const result = await db.collection('contacts').find({}).toArray();
        return result;
    }
    catch (err) {
        throw Boom.internal('Internal MongoDB error', err);
    }
};
