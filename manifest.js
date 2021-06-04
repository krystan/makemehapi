/**
 * Created by Chris on 30/03/2016.
 */
const Pack = require('./package');

var dbOpts = {
    url: "mongodb://localhost:27017/API_DB",
    db: {
        "native_parser": false
    },
    useUnifiedTopology: true,
    decorate: true
};

module.exports = {
    server: {
        port: 3000
    },
    register: {
        plugins: [
            {
                plugin: '@hapi/good', options: {
                    reporters: {
                        myConsoleReporter: [{
                            module: '@hapi/good-squeeze',
                            name: 'Squeeze',
                            args: [{ log: '*', response: '*' }]
                        }, {
                            module: '@hapi/good-console'
                        }, 'stdout']
                    }
                }
            },
            { plugin: '@hapi/inert' },
            { plugin: '@hapi/vision' },
            { plugin: 'hapi-swagger', options: { info: { title: "My Api", version: Pack.version }, tags: [{ name: 'api' }] } },
            { plugin: 'hapi-mongodb', options: dbOpts },
            { plugin: './names', options: {} },
            { plugin: './data', options: {} },
            { plugin: './health', options: {} }
        ]
    }
};
