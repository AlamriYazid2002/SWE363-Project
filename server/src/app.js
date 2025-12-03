import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.get("/api/health", (_req,res)=>res.json({ok:true,time:new Date().toISOString()}));

app.use((err,_req,res,_next)=>res.status(err.status||500).json({error:err.message||"Server error"}));

const port = process.env.PORT || 5000;
connectDB().then(()=>app.listen(port,()=>console.log(`🚀 :${port}`)));
