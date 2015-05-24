var https = require("https");

var options = {
  hostname: "api.github.com",
  port: 443,
  path: "/users/jasandine",
  headers: {'user-agent': 'node.js'},
  method: "GET"
};

// var login = "jasandine";

function printMessage(login, public_repos) {
  var message = login + " has " + public_repos + " public repositories";
  console.log(message);
}


var req = https.request(options, function(res) {
  var body = "";

  res.on('data', function(chunk) {
    body += chunk;
  });
  res.on('end', function (){
    var profile = JSON.parse(body);
    printMessage(profile.login, profile.public_repos)
    console.dir(profile);
  });
});

req.end();

req.on('error', function(error) {
  console.error(error);
});
