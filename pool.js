const { Pool } = require('pg')
const pool = new Pool({
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
<<<<<<< HEAD
    password: '123456',
    database: 'postgres2'
=======
    password: '12345678',
    database: 'postgres3'
>>>>>>> e6a541a8c2fd4301f7c779d2cef8cd8380812743
    },
    API_PORT=3001
)

module.exports = pool