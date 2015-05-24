var https = require("https");

var login = "jasandine";

function printMessage(login, public_repos) {
  var message = login + " has " + public_repos + " public repositories";
  console.log(message);
}

function printError(error){
  console.log(error.message);
}



  var options = {
    hostname: "api.github.com",
    port: 443,
    path: "/users/jasanddine",
    headers: {'user-agent': 'node.js'},
    method: "GET"
  };

  var req = https.request(options, function(res) {
    var body = "";

    res.on('data', function(chunk) {
      body += chunk;
    });
    res.on('end', function (){
      if(res.statusCode === 200) {
        try {
          var profile = JSON.parse(body);
          printMessage(profile.login, profile.public_repos)
        } catch(error) {
          printError(error);
        }
      } else {
        printError({message: "There was an error getting the profile for " + login + 
          ". (" + [res.statusCode] + ")"});
      }
    });
  });
req.end();
req.on('error', printError);

