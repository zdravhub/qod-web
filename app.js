const express = require('express');
const dateFormat = require('dateformat');
const request = require('request');

const QOD_API_URL = process.env.QOD_API_URL;

function logMsg( msg ) {
    console.log(msg);
}

function logErr(err) {
    console.error(err);
}


var app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 8080);

app.enable('trust proxy'); 

app.get('/', function(req,res) {
    logMsg('GET request: /');
    logMsg('calling ' + QOD_API_URL + '/daily');
	request(QOD_API_URL+'/daily', function (error, response, body) {
		if( error ) {
			var quote = {
				"title": "QOD Error",
				"today": "",
				"quote": error,
				"author": "",
				"genre": ""
            };
            logErr(error);
			res.render('home', quote);
		} else {
			console.log(body);
			var quote = JSON.parse(body);
			var now = new Date();
			quote.today = dateFormat(now, "dddd, mmmm dS, yyyy");
            quote.title = "Quote of the Day";
            logMsg('dishing up quote: '  + JSON.stringify(quote) );
			res.render('home', quote);
		}
	});
});

app.get('/random', function(req,res) {
    logMsg('GET request: /random');
    logMsg('calling ' + QOD_API_URL+'/random');
	request(QOD_API_URL+'/random', function (error, response, body) {
        if( error ) {
            var quote = {
				"title": "QOD Error",
				"today": "",
				"quote": error,
				"author": "",
				"genre": ""
            };
            logErr(quote);
			res.render('home', quote);
        } else {
            var quote = JSON.parse(body);
            quote.today = "";
            quote.title = "Random Quote";
            logMsg('dishing up random quote: '  + JSON.stringify(quote) );
            res.render('home', quote);
        }
	  });
});

var randomIntervalId = null;

function getRandomQuote(){
    request(QOD_API_URL+'/random', function (error, response, body) {
        if( error ) {
            var quote = {
				"title": "QOD Error",
				"today": "",
				"quote": error,
				"author": "",
				"genre": ""
            };
            logErr(quote);
        } else {
            var quote = JSON.parse(body);
            quote.today = "";
            quote.title = "Random Quote";
            logMsg('dishing up random quote: '  + JSON.stringify(quote) );
        }
	  });
}

app.get('/random/start', function(req,res) {
    logMsg('GET request: /random/start');
    var time = req.query.time;
    logMsg('/random/start?query=' + time );
    time = parseInt(time);
    if( isNaN(time) ) {
        logErr("Random interval value is not a number: "+time);
        if( randomIntervalId != null ) {
            logMsg('cancelling random quote interval');
            clearInterval(randomIntervalId);
            randomIntervalId = null;
        }
    } else {
        if( 100 < time && time < 60*60*1000 ) {
            // must be between 100ms and an hour.
            logMsg('repeating call for random quote: ' + time + 'ms.' );
            randomIntervalId = setInterval(getRandomQuote, time );
        } else {
            logErr('Random interval out of range (100-'+(60*60*1000)+')');
        }
    }
    res.redirect('/');
});

app.get('/random/stop', function(req,res) {
    logMsg('GET request: /random/stop');
    if( randomIntervalId != null ) {
        logMsg('cancelling random quote interval');
        clearInterval(randomIntervalId);
        randomIntervalId = null;
    }
    res.redirect('/');
});

const package = require('./package.json');
const appName = package.name;
const appVersion = package.version;

console.log(`Starting ${appName} v${appVersion}.`);

app.listen(app.get('port'), '0.0.0.0', function() {
	  console.log("Now serving quotes on port " + app.get('port'));
});



	
