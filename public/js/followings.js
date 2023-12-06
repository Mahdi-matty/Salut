let following;

const getUserId_3 = async () => {
    try {
      const response = await fetch("/api/sessiondata");
      const data = await response.json();
      return data.user.id;
    } catch (error) {
      console.error("Error fetching user ID:", error);
      return null;
    }
  };

  getUserId_3().then((userId) => {
    if (userId) {
    //   fetch(`/api/followedBy/${userId}/followers/showFollower`);
      console.log("Do following works?");
      fetch(`/api/followsTo/${userId}`)
      .then(response =>response.json())
      .then(data => {
          console.log("Listen !!")
          console.log(data[0].FollowId);
          
          const followingContainer = document.querySelector("#following-container");
          const followingList = document.createElement(`ul`);
          const testEl = document.createElement('p');
          testEl.textContent = "Do you work inside front end JS?";
          // followersContainer.append(testEl);
          
          
          for (let i = 0; i < data.length; i++) {
              // console.log(data[i]);
              fetch(`/api/users/${data[i].FollowId}`).then(res=>res.json()).then(res2=>{
                  console.log(`I am a follower !! i : ${i}`);
                  following=res2.username;
                  console.log(following);
                  const listItem = document.createElement('li');
                  listItem.textContent = following;
                  followingList.appendChild(listItem);
              });
 
        }

        followingContainer.append(followingList);
      })
      .catch(error => console.error('Error fetching followers:', error));
     
   
    }});
  