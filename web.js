var express = require('express');
var http = require('http');
var mongodb = require('mongodb');
var bodyParser = require('body-parser');
var path = require('path');
//var multer = require('multer'); 

//var _ = require("./underscore-min");

var ObjectId = mongodb.ObjectID;

//var uri = 'mongodb://127.0.0.1/Sime';
var uri = 'mongodb://admin:energetico@ds239439.mlab.com:39439/energias';

var app = express();
var server = http.createServer(app);

process.env.PWD = process.cwd();
app.use(express.static(path.join(process.env.PWD, 'public')));

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);
app.use(bodyParser.json()); // for parsing application/json
//app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(multer()); // for parsing multipart/form-data


var puerto = process.env.PORT || 3000;
server.listen(puerto);    

console.log('Servidor escuchando en puerto ' + puerto);

mongodb.MongoClient.connect(uri, function(err, client) {  
	
    app.get('/getMediciones/:medidor', function(request, response){
		var medidor = request.params.medidor.toString();
		
        console.log(medidor);
        
		var col_mediciones = client.db('energias').collection('mediciones');
		col_mediciones.find({}).toArray(function(err, mediciones){
            console.log("error:" + err);
            console.log("mediciones:" + mediciones);
			response.send(JSON.stringify(mediciones));
		});	
	});
    
    app.post('/guardarMedicion', function(request, response){
		var mediciones = request.body;
        console.log(request.body);
		var col_mediciones = client.db('energias').collection('mediciones');
		
		col_mediciones.save(mediciones, function(){
			if(err) throw err;
			response.send("ok");
		});
	});	
});

