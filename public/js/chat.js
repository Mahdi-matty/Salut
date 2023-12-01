const socket = io();

  const messageList = document.querySelector('.ugad');
  const form = document.querySelector('#usent');
  const input = document.querySelector('#messageInput');
  const userNom= document.querySelector(".userNome");

  function sendMessage(e){
    e.preventDefault();
    const newMsg = input.value;
    socket.emit('message', {userNom: userNom.innerText, newMsg});

    input.value= "";
}
form.addEventListener('click', sendMessage);

function addMessage(messageData, isSent) {
    const {userNom, newMsg} = messageData;
    const li = document.createElement('li');
    li.innerText = `${userNom}: ${newMsg}`;

    if (isSent) {
        li.classList.add('sent-message');
    } else {
        li.classList.add('received-message');
    }

    messageList.append(li);
}

socket.on("message", messageData => {
    addMessage(messageData, true);
});

socket.on("receivedMessage", messageData => {
    addMessage(messageData, false); 
});

function alertUser() {
    addMessage("user Connected", false);
}

socket.on("userConnected", alertUser);