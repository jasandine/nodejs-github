var https = require("https");

var options = {
  hostname: "api.github.com",
  port: 443,
  path: "/users/jasandine",
  headers: {'user-agent': 'node.js'},
  method: "GET"
};


var req = https.request(options, function(res) {
  console.log("statusCode: ", res.statusCode);

  res.on('data', function(d) {
    process.stdout.write(d);
  });
});
req.end();

req.on('error', function(e) {
  console.error(e);
});
