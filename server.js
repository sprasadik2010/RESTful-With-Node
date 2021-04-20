var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mysql = require('mysql'),
  //Task = require('./api/models/todoListModel'), //created model loading here
  bodyParser = require('body-parser');
  
// mysql instance connection url connection
mysql.Promise = global.Promise;
var con = mysql.createConnection({
  host: "182.50.133.92",
  port: "3306",
  user: "wddbuser",
  password: "!q2w3e4r",
  database: "walkdrum"
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("SELECT * FROM winfo", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
}); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/todoListRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });