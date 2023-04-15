const user = {

	id: { type: 'integer' },
	email: { type: 'string', format: 'email' },
	name : {type : 'string'},
	walletAddress :  {type : 'string', nullable : true},
	twitterHandle :{type : 'string',nullabel : true} 
}

export const registerUserResponse = {

	status : 201,
	description : "Register User",
	schema : {
	properties : user
	}

}

export const profileResponse = {
	status : 200,
	description : "Get Profile of user",
	schema : {
	properties : user
	}
}
