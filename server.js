const PORT = 64001;

const express = require("express");
const app = express();
app.use(express.static(__dirname + "/public"));
const http = require("http");
const server = http.createServer(app);

const io = require("socket.io")(server, {
});

/*
app.get("/:msg", (req, res) => {
	console.log(req.params.msg);
	res.redirect("/");
});
*/

io.on("connection", (socket) => {
	socket.on("message", (message) => {
		text = message.text;
		if (text.length > 2000) {
			return;
		}
		console.log(socket.handshake.address + " " + text);
		socket.broadcast.emit("message", {user: socket.handshake.address, text: text});
	});
});


server.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
