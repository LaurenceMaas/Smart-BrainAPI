const handleRegister = (req,res,sqllite,bcrypt) => 
{
	const {email,name,password} = req.body;
	if (!email || !name || !password){
		return res.status(400).json("None of the email,name and password fields may be blank when registering a user")
	}	
	
	const saltRounds = 10;
	const hash = bcrypt.hashSync(password, saltRounds);
	const current_datetime = new Date()
	const formatted_date = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear() 
							+ " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" +current_datetime.getSeconds();


	sqllite.transaction(trx => 
	{
		trx.insert({
			hash:hash,
			email:email		
		})
		.into("Login")
		.then(trx.commit)
		.catch(trx.rollback)			
		}).catch(err => res.status(400).json("Cannot create user login"))
		
		sqllite.transaction(trx => 
		{
			trx.insert(
			{
				Email : email,
				Name: name,
				joined: formatted_date	
			})
		.into("Users")
		.then(trx.commit)
		.catch(trx.rollback)			
	}).catch(err => res.status(400).json("Cannot register user"))
	
	sqllite('users').max("Id").select("*").then( response => res.status(200).json(response) )

	
}
//)

module.exports = {
	handleRegister: handleRegister
}