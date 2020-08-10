const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let refLinks = new Schema({
    username: String,
    password: String,
    referralLink: String
});
module.exports = mongoose.model('refLinks', refLinks);