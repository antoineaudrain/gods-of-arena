const pg = require('pg')

module.exports = new pg.Pool({
  host: process.env['DB_HOST'] || 'localhost',
  user: 'goa',
  password: 'goa',
  database: 'goa',
  port: 5432,
});