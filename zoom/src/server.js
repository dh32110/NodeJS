import http from "http";
import SocketIO from "socket.io";
const { instrument } = require("@socket.io/admin-ui");
import express from "express";
// import WebSocket from "ws";

const app = express();

app.set("view engine", "pug");

app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));
app.engine("pug", require("pug").__express);

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);
