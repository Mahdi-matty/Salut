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

function addMessage(message, isSent) {
    const li = document.createElement('li');
    li.innerText = message;

    if (isSent) {
        li.classList.add('sent-message');
    } else {
        li.classList.add('received-message');
    }

    messageList.append(li);
}

socket.on("message", message => {
    addMessage(message, true);
});

socket.on("receivedMessage", message => {
    addMessage(message, false); 
});

function alertUser() {
    addMessage("user Connected", false);
}

socket.on("userConnected", alertUser);