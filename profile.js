const userprofile = (req,res,db)=>{
    const { id } = req.params ; // We did req.params as we will read the id from the url body , thats why
    db.select('*').from('users').where({
        id : id
    }).then(user =>{ if(user.length){ res.json(user) }
                     else{
                         res.status(400).json('Not found ')
                     } 
                    })
                    .catch(err => res.status(400).json('Error getting the user'))
}
module.exports = {
    userprofile : userprofile
}