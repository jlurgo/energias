var express = require('express');
var http = require('http');
var mongodb = require('mongodb');
var _ = require("./underscore-min");

var ObjectId = mongodb.ObjectID;

//var uri = 'mongodb://127.0.0.1/Sime';
var uri = 'mongodb://admin:energetico@ds239439.mlab.com:39439/energias';

var app = express();
var server = http.createServer(app);

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);

var puerto = process.env.PORT || 3000;
server.listen(puerto);    

console.log('Servidor escuchando en puerto ' + puerto);

mongodb.MongoClient.connect(uri, function(err, client) {  
	
    app.get('/getMediciones/:medidor', function(request, response){
		var medidor = request.params.medidor.toString();
		
		var col_mediciones = client.db('Energias').collection('mediciones');
		col_mediciones.find({}).toArray(function(err, mediciones){
			response.send(JSON.stringify(mediciones));
		});	
	});
    
    app.post('/guardarMedicion', function(request, response){
		console.log("guardando");
		var medicion = request.body.medicion;
		var col_mediciones = client.db('Energias').collection('mediciones');
		
		col_mediciones.save(medicion, function(){
			if(err) throw err;
			response.send("ok");
		});
	});	
});

