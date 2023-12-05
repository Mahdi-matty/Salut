
let curr_user_id;
let receiverUser;

// Fetch session data
fetch("/api/sessiondata")
  .then((res) => res.json())
  .then((res2) => {
    console.log(res2.user.id);
    curr_user_id = res2.user.id;

    // Fetch users after getting session data
    return fetch("/api/users", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Something went wrong, Please try again!");
    }
  })
  .then((users) => {
    console.log("Get successful!");
    displayUsers(users);
  })
  .catch((error) => {
    alert(error.message);
  });

    function displayUsers(users) {
        const userListElement = document.getElementById("userListHere");
        

        if (users.length > 0) {
            const ul = document.createElement("ul");

            users.forEach((user) => {
            const li = document.createElement("li");
            li.textContent = user.username;
            li.setAttribute("data-user-id", user.id);
            li.addEventListener("click", handleUserClick);
            ul.appendChild(li);
            });

            userListElement.appendChild(ul);
            } else {
            userListElement.innerHTML = "<p>No users found.</p>";
            }
    }

    function handleUserClick(event) {
        reciverUser = event.currentTarget.getAttribute("data-user-id");
        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.placeholder = "Write your message";
        inputField.id = "messageInput";

        const submitButton = document.createElement("button");
        submitButton.type = "button";
        submitButton.textContent = "Send";
        submitButton.addEventListener("click", handleSendMessage);

        const searchResultsInbox = document.getElementById("searchResultsInbox");
        searchResultsInbox.innerHTML = "";
        searchResultsInbox.appendChild(inputField);
        searchResultsInbox.appendChild(submitButton);
        }
        function handleSendMessage() {
            const inputField = document.getElementById("messageInput");
            const searchValue = inputField.value;

            const postObj = {
                content: searchValue,
                sender_id: curr_user_id,
                reciver_id: reciverUser
            }
        fetch("/api/message/",{
            method:"POST",
            body:JSON.stringify(postObj),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>{
        if(res.ok){
            return res.json();
        }else{
            alert("Something went wrong, Please try again !");
        }
        }).then ((createdMessage)=>{
            appendMessageToUI(createdMessage);
        })
        .catch((error) => {
            alert(error.message);
        });
    }
    function appendMessageToUI(message) {
        const searchResultsInbox = document.getElementById("searchResultsInbox");
    
        const messageContainer = document.createElement("div");
        messageContainer.innerHTML = `
            <p>Sender ID: ${message.sender_id}</p>
            <h4>${message.content}</h4>
            <p>Receiver ID: ${message.reciver_id}</p>
            <hr>
        `;
    
        searchResultsInbox.appendChild(messageContainer);
    }