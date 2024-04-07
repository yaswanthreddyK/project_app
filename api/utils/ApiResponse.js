

class ApiResponse{
    constructor(
        message = "Success",
        statusCode = 400,
        data = null
    ){
        this.data = data,
        this.message = message,
        this.success = statusCode < 400
    }
}

export default ApiResponse