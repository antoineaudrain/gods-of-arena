const { Client } = require('pg')

module.exports = new Client({
    user: 'root',
    host: 'localhost',
    database: 'goa',
    password: 'root',
    port: 5433,
});