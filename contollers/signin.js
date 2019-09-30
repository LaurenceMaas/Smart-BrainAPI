const handleSignin = (req,res,sqllite,bcrypt) => 
{
	const {email,password} = req.body
	
	if (!email || !password){
		return res.status(400).json("None of the email and password fields may be blank when signing in");	
	
	}
	
	sqllite("Login").where({Email : email}).select('Email',"hash")
	.then(data=>{ 	
		const IsValid = bcrypt.compareSync( password,data[0].Hash)
		if (IsValid){
			sqllite("Users").where({Email : email}).select("*")
			.then(user=> {res.status(200).json(user)})
			.catch(err => res.status(400).json("User not found"))
		}else{
			res.status(400).json("User credentials incorrect");		
		}			
	}).catch(err => res.status(400).json("Error verifying password"))
	
}


module.exports = {
	handleSignin: handleSignin
}	