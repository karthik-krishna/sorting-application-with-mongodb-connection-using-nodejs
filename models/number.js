
// load the things we need
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var relationship = require("mongoose-relationship");
//var baseURL='http://codewave.co.in:5000/';
// define the schema for our user model
var numberSchema = new mongoose.Schema({

  	number  : { type: Number, required: true, trim: true} 

},
{
timestamps: true
});


/**
 * Helper method for hide the password and __v fields  in Json Response.
 */
 numberSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.password;
  delete obj.__v
  return obj;
}



module.exports = mongoose.model('Number', numberSchema);
