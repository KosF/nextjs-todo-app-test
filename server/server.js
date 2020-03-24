const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json({ limit: "100kb" }));

app.all("*", function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header("Access-Control-Allow-Headers", req.header("access-control-request-headers"));

  if (req.method === "OPTIONS") {
    res.send();
  } else {
    const targetURL = req.header("Target-URL");

    if (!targetURL) {
      res.send(500, {
        error: "There is no Target-URL header in the request"
      });

      return;
    }

    request(
      { url: targetURL + req.url, method: req.method, json: req.body },
      function(error, response) {
        if (error) {
          console.error("error: " + response.statusCode);
        }
      }
    ).pipe(res);
  }
});

app.set("port", process.env.PORT || 8080);

app.listen(app.get("port"), function() {
  console.log("Proxy server listening on port " + app.get("port"));
});
