const socket = io();

  const messageList = document.querySelector('.ugad');
  const form = document.querySelector('#usent');
  const input = document.querySelector('#messageInput');

  function sendMessage(e){
    e.preventDefault();
    socket.emit('message', input.value);

    input.value= "";
}
form.addEventListener('click', sendMessage);

function addMessage(message) {
    const li = document.createElement('li');
    li.innerText= message;
    messageList.append(li);
}
socket.on("message", addMessage);

function alertUser(){
    addMessage("user Connected");
} 
socket.on("user Connected", alertUser);