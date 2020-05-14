const knex = require("knex");
const knexfile = require("../knexfile");

// look up a value in an object using a variable as the
// keyname if it's wrapped in square brackets
module.exports = knex(knexfile[process.env.NODE_ENV]);
