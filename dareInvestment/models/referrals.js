const mongoose = require('mongoose');
const shortId = require('shortid')

const referralSchema = new mongoose.Schema({
    username: {
        type: String
    },
    // password: {
    //     type: String
    // },
    referralLink: {
        type: String,
        default: shortId.generate
    }
});
module.exports = mongoose.model('referral', referralSchema);