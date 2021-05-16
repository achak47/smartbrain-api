var express = require('express') ;
var app = express() ;
const register = require('./register') ;
const signin = require('./signin') ;
const bcrypt = require('bcrypt-nodejs');
const profile = require('./profile') ;
const image = require('./image') ;
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
const cors = require('cors') ;
const knex = require('knex') ;
const db = knex({
    client: 'pg',
    connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'Anurag12#',
    database : 'smartbrain'
    }
}) ;

db.select('*').from('users').then(data=>console.log(data)) ;
app.use(express.json()) ;
app.use(cors()) ;
app.get('/' , (req,res)=>{
    res.json(db.users) ;
})
app.post('/signin' , (req,res)=>{ signin.usersignin(req,res,bcrypt,db)} ) 


app.post('/register',(req,res)=>{ register.registeruser(req,res,bcrypt,db)}) 

//This is called dependency injection
// As we are injecting the dependencies on a function to a new file , rather than declaring it again in the new file

app.get('/profile/:id', (req,res)=>{ profile.userprofile(req,res,db) }) 

app.put('/image' , (req,res)=>{ image.userimage(req,res,db)})
app.post('/imageUrl' , (req,res)=>{ image.apicall(req,res)})
app.listen(process.env.PORT||5000 , ()=> {
    console.log("App is running") ;
  }) ;
//We can use environment variables for the port , in order to make it dynamic
// const PORT = process.env.PORT
// In the terminal we need to write :- bash
// PORT-3000 Node server.js  
// NOTE :- We can put anything in place of 3000 , while writing in the terminal
// app.listen(PORT , ()=>{}) 
// signin-->POST = success/fail
// register --> POST = user
//profile/userid --> GET = user
// image --> PUT = user (ie- updating the rank)
