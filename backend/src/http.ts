import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";
import cors from 'cors'

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")))

app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}))

const serverHttp = http.createServer(app)

const io = new Server(serverHttp)

export { serverHttp, io }