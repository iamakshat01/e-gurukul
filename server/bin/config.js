require('dotenv').config()
const configVars = {
    mongourl : process.env.DATABASE,
    secret : process.env.SECRET
};

module.exports = configVars;