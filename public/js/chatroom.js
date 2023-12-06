const messageBox = document.querySelector("#messagesChatRoom");
const textBox = document.querySelector(".inputChatField");
const sendButton = document.querySelector(".sendChatBtn");
const userChatContainer = document.querySelector("#userChatListContainer");
let senderUserName;
const socket = io();

// function updateUserList(usernames) {
//   userChatContainer.innerHTML = "";
//   if (Array.isArray(usernames)) {
//   const userListElement = document.createElement("ul");
//   usernames.forEach((username) => {
//     const listItem = document.createElement("li");
//     listItem.textContent = username;
//     userListElement.appendChild(listItem);
//   });
//   userChatContainer.appendChild(userListElement);
// }else {
//   console.error("Invalid usernames data:", usernames);
// }
// }



function createMessage(message, ownMessage = false) {
  const messageElement = document.createElement("div");
  messageElement.className = "container-md";
  const subMesssageElement = document.createElement("div");
  subMesssageElement.className =
    "container-md";
  if (ownMessage) {
    subMesssageElement.className += " position-relative top-0 start-0";
  }

  subMesssageElement.innerText = `${message.sender}: ${message.text}`;
  subMesssageElement.style.color = "blue";
  messageElement.appendChild(subMesssageElement);

  messageBox.appendChild(messageElement);
}


socket.on("connection", (socket) => {
  console.log(socket.id);
});
socket.on("user-list", (usernames) => {
  console.log("Received User List:", usernames);
  updateUserList(usernames);
});
socket.on("receive-message", (message) => {
  createMessage(message);
});
async function fetchDataAndUsername() {
  try {
    // Fetch userId from /api/sessiondata
    const sessionDataResponse = await fetch("/api/sessiondata");
    if (!sessionDataResponse.ok) {
      throw new Error("Failed to fetch userId");
    }

    const sessionData = await sessionDataResponse.json();
    senderUserName = sessionData.user.username;

    // Use userId to fetch username
  } catch (error) {
    console.error("Error:", error);
  }
}
sendButton.addEventListener("click", async () => {
 await fetchDataAndUsername();
 newUserName = document.querySelector("#userNameChatSender");
  const messageText = textBox.value.trim();
  if (messageText!= "") {
    socket.emit("send-message", {text:messageText, sender:senderUserName});
    socket.emit("update-user-list", { usernames: newUserName});
    createMessage({ text: textBox.value, sender: senderUserName }, true);

    textBox.value = "";
  }
});