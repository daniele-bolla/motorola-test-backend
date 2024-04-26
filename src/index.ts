import express, {Response, Request} from "express";
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from "dotenv";
import routes from "./routes.js";
import mongoose from "mongoose";

dotenv.config();

const app = express(); 
app.use(cookieParser()); 
app.use(express.json()); 
app.use(
    cors({
        credentials: true,
        // origin: ["http://localhost:3000"]
    })
);
app.use("/api",routes)


// const port = process.env.APP_POR
const port = process.env.PORT || 3000
const dbUri = process.env.DB_URI || "mongodb+srv://bolladaniele:GdAgTgsffT75jE4I@cluster0.vdzprnw.mongodb.net/motorola-test-db"
app.get('/check', (req:Request,res:Response)=> res.status(200).send("Hello")) 
app.get('/', (req:Request,res:Response)=> res.status(200).send("Hello")) 
app.listen(port, () => { 
  console.log("Server running at port: ", port); 
}).on("error", (error: { message: string | undefined; }) => {
  throw new Error(error.message);
});

mongoose.Promise = Promise;
mongoose.connect(dbUri)