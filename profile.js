var https = require("https");


function printMessage(login, public_repos) {
  var message = login + " has " + public_repos + " public repositories";
  console.log(message);
}

function printError(error){
  console.log(error.message);
}

function getUser(login) {
  var options = {
    hostname: "api.github.com",
    port: 443,
    path: '/users/' + login,
    headers: {'user-agent': 'node.js'},
    method: "GET"
  };

  var req = https.get(options, function(res) {
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

req.on('error', printError);
}

module.exports.get = getUser;
