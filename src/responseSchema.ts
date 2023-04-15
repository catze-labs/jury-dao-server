export const healthResponse = {
	status: 200,
	description : "Server health check",
	schema : {
		properties : {
			health : {type : 'boolean'}
		}
	}
}
