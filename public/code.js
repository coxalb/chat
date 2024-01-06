const socket = io();
socket.connect();

let messagebox = document.getElementById("messagebox");

function renderMessage(type, message) {
	let new_message = document.createElement("div");
	new_message.classList.add("message", type);
	let name_div = document.createElement("div");
	if (type == "my-message") {
		name_div.innerText = "You:";
	} else if(type == "other-message") {
		name_div.innerText = message.user;
	}
	new_message.appendChild(name_div);
	let text_div = document.createElement("div");
	text_div.innerText = message.text;
	new_message.appendChild(text_div);
	document.getElementById("messagebox").appendChild(new_message);
	messagebox.scrollTo(0, messagebox.scrollHeight);
	return new_message;

}


let message_input = document.getElementById("message-input");
message_input.addEventListener("keydown", (event) => {
	if (event.key == "Enter") {
		event.preventDefault();
		let msg = message_input.value;
		if (msg == "") {
			return;
		}
		socket.emit("message", {text: msg});
		message_input.value = "";
		renderMessage("my-message", {text: msg});
	}
});

socket.on("message", (message) => {
	console.log(message);
	renderMessage("other-message", message);
});

//socket.on("
