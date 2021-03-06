// Import twit npm module
var Twit = require('twit');
// Imports twitter credential config

if (!process.env.CONSUMER_KEY) {
  var twitterCredentials = require('../../config.js').twitter;
}

var T = new Twit({
    "consumer_key": process.env.CONSUMER_KEY || twitterCredentials["consumer_key"],
    "consumer_secret": process.env.CONSUMER_SECRET || twitterCredentials["consumer_secret"],
    "access_token": process.env.ACCESS_TOKEN || twitterCredentials["access_token"],
    "access_token_secret": process.env.ACCESS_TOKEN_SECRET || twitterCredentials["access_token_secret"]
});

// getTweets: Function that gets the 'n' most recent tweets given a query string and a number n
var getTweets = function (query, number, callback) {
  T.get('search/tweets', {q: query, count: number}, callback);
};

// streamTweets: Function that streams tweets with a location or geocode provided
var streamTweets = function (query, callback) {
  var stream = T.stream('statuses/filter', {'locations':['-180','-90','180','90']});
  stream.on('tweet', callback);
};

module.exports = { 
  // getTweets: getTweets,
  streamTweets: streamTweets
};
