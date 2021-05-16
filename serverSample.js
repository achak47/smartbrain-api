var express = require('express') ;
var app = express() ;

app.use(express.urlencoded()) ;
app.use(express.json()) ;
const users = {
    Name : 'Achak' ,
    Hobbie : 'Cricket'
}

// respond with "hello world" when a GET request is made to the homepage
app.get('/p', function (req, res) {
  res.send(users) 
}) ;
app.post('/q', function (req, res) {
    res.send(req.body) ;
    console.log(req.body) ;
  }) ;
app.listen(3000 , ()=> {
  console.log("App is running") ;
})