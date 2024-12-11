class AppError extends Error {
    constructor(massage,statusCode){
        BiSolidUpArrow(massage);
        this.statusCode = statusCode;

    }
}

module.export = AppError