const socket = io();

const welcome = document.querySelector("#welcome");
const form = welcome.querySelector("form");
const room = document.querySelector("#room");

let roomName, nickname;

room.hidden = true;

function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
}

function handleSubmitMessage(e) {
  e.preventDefault();
  const input = room.querySelector("#msg input");
  const value = input.value;
  socket.emit("new_message", input.value, roomName, () => {
    addMessage(`You: ${value}`);
  });
  input.value = "";
}

function handleSubmitNickname(e) {
  e.preventDefault();
  const input = room.querySelector("#name input");
  socket.emit("nickname", input.value);
}

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;
  const span = room.querySelector("span");
  span.innerText = `My nickname: ${nickname}`;
  const msgForm = room.querySelector("#msg");
  msgForm.addEventListener("submit", handleSubmitMessage);
}

function handleRoomSubmit(e) {
  e.preventDefault();
  const roomNameInput = form.querySelector("#roomName");
  const nameInput = form.querySelector("#nickname");
  roomName = roomNameInput.value;
  nickname = nameInput.value;
  socket.emit("enter_room", roomNameInput.value, nameInput.value, showRoom);
  roomNameInput.value = "";
  nameInput.value = "";
}

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", (user) => {
  addMessage(`${user} arrived!`);
});

socket.on("bye", (left) => {
  addMessage(`${left} left`);
});

socket.on("new_message", addMessage);
