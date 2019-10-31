const Clarifai = require ('clarifai');

// CLARIFAI API KEY
const app = new Clarifai.App({
   apiKey: '6c8742e148964814b2d8d24f21bd82bb'
});

const handleApiCall = (req, res) => {
   app.models
      .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
      .then(data => {
         res.json(data);
      })
      .catch(err => res.status(400).json('unable to work with API'))
}

const handleImageGet = (req, res, db)  =>{    
   const { id } = req.body;
   db('users').where('id', '=', id)
   .increment('entries', 1)
   .returning('entries')
   .then(entries => {
      res.json(entries[0]);
   })
   .catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
   handleImageGet,
   handleApiCall
}