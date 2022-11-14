// Create class personalize error

class StatusHttp extends Error {
    constructor(message, status){
        super(message)
        this.status = status || 400;
    }
}

export { StatusHttp }