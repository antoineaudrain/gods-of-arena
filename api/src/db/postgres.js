const pg = require('pg')

module.exports = new pg.Pool({
    host: 'localhost',
    user: 'goa',
    password: 'goa',
    database: 'goa',
    port: 5432,
});