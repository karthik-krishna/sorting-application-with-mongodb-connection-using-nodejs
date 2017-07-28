
// load the things we need
var express = require('express');
var mongoose = require('mongoose'); 
var moment = require('moment');

var fs = require('fs');
var multer  = require('multer');
var upload = multer({ dest: 'public/images/' });
var request = require('request');


var jwt = require('jwt-simple');
//var jwt = require("../services/jwtauth.js");

//var mail = require('../services/mail.js');

var app = express();

//models
var Number = mongoose.model('Number');
//var Comment = mongoose.model('Comment');

/**
 * POST /signup
 * Create a new local account.
 */
exports.addnumber = function(req, res, next) {

 // Generic validation
 //console.log(req);
	req.assert('number', 'number field is empty').notEmpty();
 
  	var errors = req.validationErrors();

  	if (errors) {
    	return res.send({status_code:400, status:'failure', message:errors})
  	}
  	else {
			var newNumber = new Number();
    			newNumber.number 	 = req.body.number;


		    	newNumber.save(function(err, numCreated) {
		      		if (err) {
		       			return res.json({status_code:500, status:'failure', message:'Internal Server Error',Error: err})
		      		}
		      		else {
		      			return res.json({status_code:200, status:'success', number_info: numCreated})
		      		} 
		    	})
	    	}
};


exports.listAllNumbers = function(req, res, next) {
 
	Number.find().exec(function(err, usersFound) {
    if(err) {
       return res.json({status_code:500, status:'failure', message:'Internal Server Error',Error: err})
    }
    else {
      if(typeof(usersFound)!=undefined && (usersFound).length > 0) {
         return res.json({status_code:200, status:'success', numbers_list: usersFound})
      }
      else {
      	return res.json({status_code:401, status:'failure', message:'No numbers found.'})
      }
    } 
  })
}

exports.deleteNumbers = function(req, res, next) {


				Number.remove({}, function(err) { 
				  if(err) {
						return res.json({status_code:500, status:'failure', message:'Internal Server Error',Error: err})
					}
					else {
						return res.json({status_code:200, status:'success'})
					}
				});
}



