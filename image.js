const Clarifai = require('clarifai') ;
const app = new Clarifai.App({
    apiKey: 'f656cc73e40844d5a5d984cc88c3d102'
   });
const apicall = (req,res)=>{
   app.models.predict('a403429f2ddf4b49b307e318f00e528b' , req.body.input)
   .then(data => {
       res.json(data) ;
       console.log(req.body.input) ;
    })
   
   }
const userimage = (req,res,db)=>{
    const { id } = req.body ;
    db('users').where('id', '=', id)
    .increment('entries' , 1)
    .returning('entries')
    .then(entries =>{ if(entries.length){ res.json(entries) }
    else{
        res.status(400).json('unable to get entries')
    }
})
    .catch(err => res.status(400).json('unable to get entries')) ;
    }
module.exports = {
    userimage,
    apicall
}