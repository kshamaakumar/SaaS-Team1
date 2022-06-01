import Mongoose = require("mongoose");

class DataAccess {
    static mongooseInstance: any;
    static mongooseConnection: Mongoose.Connection;
    // static DB_CONNECTION_STRING:string = 'mongodb://dbAdmin:test@127.0.0.1:27017/recipeWebsiteDatabase?authSource=admin';
    // The above is to connet local mongoDB, the following is to connect to cloud mongoDB
    static DB_CONNECTION_STRING:string = 'mongodb+srv://dbAdmin:test@cluster0.m4cmdsp.mongodb.net/recipeWebsiteDatabase?retryWrites=true&w=majority';
    
    constructor () {
        DataAccess.connect();
    }
    
    static connect (): Mongoose.Connection {
        if(this.mongooseInstance) return this.mongooseInstance;
        
        this.mongooseConnection  = Mongoose.connection;
        this.mongooseConnection.on("open", () => {
            console.log("Connected to mongodb.");
        });
        
        this.mongooseInstance = Mongoose.connect(this.DB_CONNECTION_STRING);
        return this.mongooseInstance;
    }
    
}
DataAccess.connect();
export {DataAccess};