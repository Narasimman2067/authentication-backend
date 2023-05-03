import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { databaseConnection } from "./db.js";
import userRouter from './routes/userRoute.js';

dotenv.config();
const app = express();

// database connection
databaseConnection();

// server connection
const PORT=process.env.PORT

app.use(express.json());
app.use(cors());
app.use("/api/auth",userRouter)





app.use("/",(req,res)=>{
    res.send({message:"mongodb and server running successfully"})
});



app.listen(PORT, () => {
  console.log(`${PORT} server connected succesfully`);
});
