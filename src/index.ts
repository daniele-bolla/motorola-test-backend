import express from "express";
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
const port = process.env.PORT
const dbUri = process.env.DB_URI

app.listen(port, () => { 
  console.log("Server running at port: ", port); 
}).on("error", (error) => {
  throw new Error(error.message);
});

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost:27017/motorola-test-db")