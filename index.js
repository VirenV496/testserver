var Linkedin = require('node-linkedin')('78k04zycrk00up', '9ax4SCz3FdcgzSXy');
Linkedin.auth.setCallback("http://localhost:3000/oauth/linkedin/callback");
var express = require('express');

var app = express()
    


// Initialize 
var scope = ['r_basicprofile', 'r_emailaddress'];


var linkedinVariables = {
    'accessToken': null,
    'client': null
}

app.get('/oauth/linkedin', function(req, res) {
    // This will ask for permisssions etc and redirect to callback url. 
    Linkedin.auth.authorize(res, scope);
    
});



app.get('/oauth/linkedin', function(req, res) {
    // set the callback url
    Linkedin.setCallback(req.protocol + '://' + req.headers.host + '/oauth/linkedin/callback');
    Linkedin.auth.authorize(res, scope);
});

app.get('/oauth/linkedin/callback', function(req, res) {
    Linkedin.auth.getAccessToken(res, req.query.code, req.query.state, function(err, results) {
        if (err)
            return console.error(err);

        console.log(results);

        linkedinVariables.accessToken = results.access_token;

        console.log("ACCESS TOKEN IS ", linkedinVariables.accessToken);

        linkedinVariables.client = Linkedin.init(linkedinVariables.accessToken);

    /*  linkedinVariables.client.people.me(function(err, $in) {
            console.log($in);
        });*/

/*linkedinVariables.client.people.me('linkedin_id', ['id', 'first-name', 'last-name'], function(err, $in) {
    // Loads the profile by id.
    console.log($in);
});*/
        linkedinVariables.client.people.id('78k04zycrk00up', function(err, $in) {
            console.log($in)
        });
        // return res.redirect('/');
    });
});

app.listen(3000 ,() =>{
    console.log("server running artb port 3000");
});
