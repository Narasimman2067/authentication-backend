import mongoose from "mongoose";





export function databaseConnection(){

const params ={
    useNewUrlParser:true,
    useUnifiedTopology:true,
};

try {
    mongoose.connect(process.env.MONGO_URL,params)
    console.log("mongodb connected succesfully")
} catch (error) {
    console.log("mongodb connectiion error",error)
}

}