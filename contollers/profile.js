const handleProfileGet  = (req,res,sqllite) => {
	const {id} = req.params;	
	sqllite('users').where({
		Id : id
	}).select("*").then(response =>
	{
		if (response.length > 0)
		{
			res.status(200).json(response);
		}
		else{
			res.status(404).json("Cannot find user");
		}
		
	}).catch(err => res.status(400).json("Error finding user"));

}

module.exports = {
	handleProfileGet: handleProfileGet
}