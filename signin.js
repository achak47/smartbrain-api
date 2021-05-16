const usersignin = (req,res,bcrypt,db) => {
    db.select('email' , 'hash').from('login')
   .where('email', '=', req.body.email)
   .then( data => {
   const isvalid = bcrypt.compareSync(req.body.password , data[0].hash) ;
   if(isvalid)
   {
    db.select('*').from('users')
    .where('email' , '=', req.body.email)
   .then(user =>{
       res.json(user[0]) ;
       console.log(user) ;
   })
   .catch(err => res.status(400).json('Unable to get user'))
 }
 else{
   res.status(400).json('Wrong Password , Pls re-enter your password') ; 
 }
  })
  .catch(err => res.status(400).json('wrong credentials'))
}
module.exports = {
    usersignin : usersignin
}