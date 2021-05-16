const registeruser = (req,res,bcrypt,db)=>{
    const { email,name,password } = req.body ;  //Destructuring
    if(!email||!name||!password)
    {
       if(!email)
       {
        return res.status(400).json('Pls enter your email id') ;
       }
       if(!password)
       {
        return res.status(400).json('Pls enter your password') ;
       }
       if(!name)
       {
        return res.status(400).json('Oh! What shall we call you ? Pls enter your name') ;
       }
    }
    const hash = bcrypt.hashSync(password) ;
    // A transaction is used as a codeblock to ensure if one request fails then the other must also fail , as otherwise it would lead to unambiguity
   // We create a transaction when we have to do more than one things at one go
    db.transaction(trx =>{
    trx.insert({
     hash : hash ,
     email : email
  })
  .into('login')
  .returning('email')
  .then(loginemail => {
    return trx('users').returning('*').insert({
        email : loginemail[0] ,
        name : name ,
        joined : new Date()
    })
   .then( user => { res.json(user[0]) })
   })
   .then(trx.commit)
   .catch(trx.rollback) ;
    })
    .catch(err => res.status(400).json('Unable to register . Try a different email id or wait after some time'))
}
module.exports = {
    registeruser : registeruser
}