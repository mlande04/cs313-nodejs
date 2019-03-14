const express = require('express');
const app = express();
var path = require('path');

const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL
const pool = new Pool({connectionString: connectionString});

// view engine setup
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

// handle any requests to getRate endpoint
app.get('/getRate', getRate);

// Start the server running
app.listen(app.get('port'), function() {

  console.log('Node app is running on port', app.get('port'));

});

// error handler
app.use(app.get('/getRate', function(err, req, res) {
  // render the error page
  res.status(err.status || 500);
  res.render('error');
  // render results
  res.render('document.getElementById("pckg").innerHTML', 
  'document.getElementById("wt").innerHTML', res);
});

// This function handles requests to the /getRate endpoint
function getRate(req, res) {

	// TODO: We should really check here for a valid id before continuing on...
	// use a helper function to query the DB, and provide a callback for when it's done
	getWeightRate(wt, function(error, result) {
		// This is the callback function that will be called when the DB is done.
		// The job here is just to send it back.
		// Make sure we got a row with the person, then prepare JSON to send back
		if (error || result == null || result.length != 1) {
			response.status(500).json({success: false, data: error});
		} else {
			const rate = result[0];
			response.status(200).json(person);
		}
	});
}

// gets rates per weight
function getWeightRate(wt, callback) {
	var wt = document.getElementById("wt").value;
	var pckg = document.getElementById("myCheck").value;
	var rate;
	
	console.log("Getting rate based on weight " + wt + " and type of package" + pckg);
	
	// get rate
	if (pckg == "sLetters")	{
		if (wt <= 1)
			rate = 0.55;
		else if  (wt <= 2)
			rate = 0.70;
		else if (wt <= 3)
			rate = 0.85;
		else
			rate = 1;
	} else if (pckg == "mLetters") {
		if (wt <= 1)
			rate = 0.50;
		else if  (wt <= 2)
			rate = 0.65;
		else if (wt <= 3)
			rate = 0.80;
		else
			rate = 0.95;
	} else if (pckg == "lgEnv") {
		if (wt <= 1)
			rate = 1;
		else if  (wt <= 2)
			rate = 1.15;
		else if (wt <= 3)
			rate = 1.30;
		else if  (wt <= 4)
			rate = 1.45;
		else if (wt <= 5)
			rate = 1.6;
		else if  (wt <= 6)
			rate = 1.75;
		else if (wt <= 7)
			rate = 1.90;
		else if  (wt <= 8)
			rate = 2.05;
		else if (wt <= 9)
			rate = 2.20;
		else if  (wt <= 10)
			rate = 2.35;
		else if (wt <= 11)
			rate = 2.50;
		else if  (wt <= 12)
			rate = 2.65;
		else
			rate = 2.8;
	} else if (pckg == "fcps") {
		if (wt <= 4)
			rate = 3.66;
		else if (wt <= 8)
			rate = 4.39;
		else if (wt <= 12)
			rate = 5.19;
		else
			rate = 5.71;
	} else
		rate = 0;
	
	// Log this to the console for debugging purposes.
	console.log("Found package: " + pckg + "rate: " + rate);
	
	callback(err, res);
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
