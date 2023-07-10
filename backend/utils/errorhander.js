class ErrorHander extends Error //node default class
{
    constructor(message, statusCode)
    {
        super(message);         //pass msg to error class constructor
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);      
    }
}

module.exports = ErrorHander