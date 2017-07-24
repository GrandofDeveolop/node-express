/**
 * Created by ubuntu14 on 7/23/17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const Account = new Schema({
    username: String,
    password: String,
    fullname: String
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('accounts', Account);