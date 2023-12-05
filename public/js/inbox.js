
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
            ul.classList.add("list-group")

            users.forEach((user) => {
            const li = document.createElement("li");
            li.classList.add("list-group-item");
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
        inputField.classList.add("form-control")

        const submitButton = document.createElement("button");
        submitButton.type = "button";
        submitButton.textContent = "Send";
        submitButton.addEventListener("click", handleSendMessage);

        const searchResultsInbox = document.getElementById("inputSendInbox");
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
    async function appendMessageToUI(message) {
        const searchResultsInboxe = document.getElementById("searchResultsInbox");
        try {
          const response = await fetch(`/api/users/getUsernameById/${message.sender_id}`);
          const data = await response.json();
  
          if (response.ok) {
              const username = data.username;
    
        const messageContainer = document.createElement("div");
        messageContainer.classList.add("container-md");
        messageContainer.innerHTML = `
            <p> ${username} :</p>
            <h4>${message.content}</h4>
            <hr>
        `;
    
        searchResultsInboxe.appendChild(messageContainer);
    }else {
      console.error('Error fetching username:', data.error);
        }
    } catch (error) {
        console.error('Error fetching username:', error.message);
    }
    }