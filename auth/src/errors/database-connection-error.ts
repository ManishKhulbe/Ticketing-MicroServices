export class DatabaseConnectionError extends Error{
    statusCode = 500;
    reason = 'Error Connecting to Database'
    constructor(){
        super();

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }

    serializeErrors(){
        return [{
           message: this.message
        }]
    }
}