const { Pool } = require('pg')
const pool = new Pool({
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: '123456',
    database: 'postgres2'
    },
    API_PORT=3001
)

module.exports = pool