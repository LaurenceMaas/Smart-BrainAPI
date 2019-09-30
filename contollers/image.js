const Clarifai = require("clarifai")

const app = new Clarifai.App({apiKey: '79962e9f7664410ebdd7bf591ad1abb7'});

const handleApiCall = (req,res) => {
	console.log(req.body.input)
	app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
	.then(response => res.status(200).json(response))
	//.catch(res.status(400).json("Unable to process face image"))
}

const handleImagePut = (req,res,sqllite) => {
	
	const {id} = req.body;

	sqllite('users').where({Id : id}).
	increment("Entries",1)
	.catch(err => res.status(400).json("Error finding user"));
	
	
	sqllite('users').where({Id : id}).select("Entries").then(response => res.status(200).json(response))
	.catch(err => res.status(400).json("Error finding user"));
			
}

module.exports = {
	handleImagePut: handleImagePut,
	handleApiCall : handleApiCall
}