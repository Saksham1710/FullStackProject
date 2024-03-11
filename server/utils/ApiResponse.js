class ApiResponse{
    constructor(statusCode, data, message = "Success", loggedIn = false){
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
        this.loggedIn = loggedIn;
    }
}

export { ApiResponse };