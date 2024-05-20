var http = require("http");
var express = require("express");

var app = express();
app.use(express.static('./public'));

var server = http.createServer(app);
server.listen(80);

console.log("Servidor rodando...");

app.get('/', function (req, res) {
    res.redirect('pagina-sobre-nos/sobreNos.html');
  });