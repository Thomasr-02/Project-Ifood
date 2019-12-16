const Sequelize = require('sequelize');

var config = require(__dirname+"/config.js");

var sequelize = new Sequelize(config.DB.database, config.DB.username, config.DB.password, 
{
  	host: config.DB.host,
  	dialect: config.DB.database_type,

	pool: {
    	max: 5,
    	min: 0,
    	acquire: 30000,
    	idle: 10000
  	},
    logging: false,
    define: {
        timestamps: false
    },
  	// http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  	operatorsAliases: false
});

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch(err => {
  module.exports.error = err;
});




module.exports.sequelize = sequelize;
module.exports.schema = config.DB.schema;