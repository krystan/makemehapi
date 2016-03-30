/**
 * Created by Chris on 30/03/2016.
 */
const Pack = require('./package');

var dbOpts = {
    url: "mongodb://localhost:27017/API_DB",
    settings: {
        db: {
            "native_parser": false
        }
    }
};

module.exports = {
    connections: [{
        port: 3000,
        labels: ["api"],
        routes: {cors: true}
    }],
    registrations: [
        {
            plugin: {
                register: 'good',
                options: {
                    reporters: [{
                        reporter: require('good-console'),
                        events: {
                            response: '*',
                            log: '*'
                        }
                    }]
                }
            }
        },
        {
            plugin: {
                register: 'inert',
                options: {select: 'api', options: {}}
            }
        },
        {
            plugin: {
                register: 'vision',
                options: {}
            }
        },
        {
            plugin: {
                register: 'hapi-swagger',
                options: {info: {title: "My Api", version: Pack.version}, tags: [{name: 'api'}]}
            }
        },
        {
            plugin: {
                register: 'hapi-mongodb',
                options: dbOpts
            }
        },
        {
            plugin: {
                register: 'chairo',
                options: {
                    timeout: 10000
                }
            }
        },
        {
            plugin: {
                register: './names',
                options: {}
            }
        },
        {
            plugin: {
                register: './data',
                options: {}
            }
        }
    ]
};