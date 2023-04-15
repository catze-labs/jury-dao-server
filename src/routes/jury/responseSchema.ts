const jury = {
	id : {type : 'integer'},
	createdAt : {type : 'string', format : 'date-time'},
	updatedAt: { type: 'string', format: 'date-time' },

	plaintiffId : {type : 'integer'},
	plaintiffTitle : {type : 'string'},
	plaintiffContent : {type : 'string'},
	plaintiffReferenceLink : {type : 'object', nullable : true},
	defendantId : {type : 'integer', nullable : true},
	defendantTitle : {type : 'string', nullable : true},
	defendantContent : {type : 'string', nullable : true},
	defendantReferenceLink  : {type : 'object', nullable : true}

}
const vote = {

	id : {type : 'integer'},
        createdAt : {type : 'string', format : 'date-time'},
        updatedAt: { type: 'string', format: 'date-time' },
	flag: {type : 'boolean'},
	juryId : {type : 'integer'},
	userId : {type : 'integer'}

}

const user = {

	id: { type: 'integer' },
	email: { type: 'string', format: 'email' },
	name : {type : 'string'},
	walletAddress :  {type : 'string', nullable : true},
	twitterHandle :{type : 'string',nullable : true} 
}
const comment = {
id : {type : 'integer'},
        createdAt : {type : 'string', format : 'date-time'},
        updatedAt: { type: 'string', format: 'date-time' },
	juryId : {type : 'integer'},
        userId : {type : 'integer'},
	content : {type : 'string'}
}
export const createJuryResponse = {


	status : 201,
	description : "Create Jury",
	schema : {
		properties : jury
	}
}
export const getJuryByIdResponse = {

	status : 201,
	description : "Get Jury By Id",
	schema : {
		properties : {
			...jury,
			plaintiff :{ type : 'object', properties :  user},
			defendant : {type : 'object', propertiee : user},

		}
	}

}


export const getJuryPaginationResponse = {

	status : 200,
	description : "Get Jury list",
	schema : {

		properties : {

			count : {type : 'integer'},
			list : {
				
			type : 'array', items: {type : 'object', properties : jury}}
			}

	}

}


export const getMyJuryPaginationResponse = {

	status : 200,
	description : "Get Jury list",
	schema : {

		properties : {

			count : {type : 'integer'},
			list : {
				
			type : 'array', items: { properties : jury}}
			}

	}

}

export const patchJuryResponse = {

	status : 200,
	description : "Patch Jury",
	schema : {

		properties : jury
	}
}



export const createVoteResponse = {

	status : 201,
	description : "Create Vote",
	schema : {
		properties : vote
	}
}

export const createCommentResponse = {

	status : 201,
        description : "Create Comment",
        schema : {
                properties : comment
        }

}

export const getCommentPaginationResponse = {
	status : 200,
        description : "Get Comment list",
        schema : {

                
		properties : {

			count : {type : 'integer'},
			list : {
				
			type : 'array', items: {type : 'object', properties : comment}}
			}

        }

}
