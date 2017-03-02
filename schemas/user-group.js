// app/models/group.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs'); 
var Platform = require('./platform');
var User = require('./user');
var Language = require('./language');

// define the schema for our group model
var groupSchema = {
  name: { type: String }
  , language :  {type : mongoose.Schema.ObjectId, ref : 'Language'}
  , platform :  {type : mongoose.Schema.ObjectId, ref : 'Platform'}
  , user :  {type : mongoose.Schema.ObjectId, ref : 'User'}
  , created_at: { type: Date, default: Date.now }
  , updated_at: { type: Date, default: Date.now }
};

var schema = new mongoose.Schema(groupSchema);  

// methods ======================
// generating a hash
schema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
schema.methods.validPassword = function(password,group_password) {
  return bcrypt.compareSync(password, group_password);
};

schema.set('toObject', { virtuals: true });
schema.set('toJSON', { virtuals: true });

// create the model for groups and expose it to our app
module.exports = schema;
module.exports.groupSchema = groupSchema;