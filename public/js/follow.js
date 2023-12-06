const getUserId = async () => {
  try {
    const response = await fetch("/api/sessiondata");
    const data = await response.json();
    return data.user.id;
  } catch (error) {
    console.error("Error fetching user ID:", error);
    return null;
  }
};

//Vinit's version

// fetch(`/api/follow/1/followers/showFollower`).then(res=>{
//   console.log(res);
// });

getUserId().then((userId) => {
  if (userId) {
    fetch(`/api/follow/${userId}/followers/showFollower`);
    
    fetch(`/api/follow/${userId}/followers`)
    .then(response =>response.json())
    .then(data => {
      console.log(" FRONT END !!");
      console.log(data[0].followers);
      follower = data[0].followers;
      const followersContainer = document.querySelector("#followers-container");
      const followerList = document.createElement(`ul`);
      data.forEach((follower) => {
        console.log("Listen !!")
        console.log(follower.followers);
        const listItem = document.createElement('li');

        //start from here
        listItem.textContent = follower.followers.username;

//not sure yet

        // if (follower.Follow && follower.Follow.id) {
        //   const badge = document.createElement('span');
        //   badge.textContent = 'Following';
        //   badge.classList.add('badge', 'bg-primary');
        //   listItem.appendChild(badge);
        // }
        
        followerList.appendChild(listItem);
        console.log(`I am sending a User !! ${userId}`)
      });
      followersContainer.append(followerList);
    })
    .catch(error => console.error('Error fetching followers:', error));
   
    // fetch(`/showFollower`).then(res=>{
    //   console.log(res);
    // });
    
    fetch(`/api/follow/${userId}/following`)
    .then((response)=>response.json())
    .then((data) => {
      const followingContainer = document.querySelector("#following-container");
      data.forEach((following) => {
        const listItem = document.createElement('li');
        listItem.textContent = following.username;
        
        if (following.Follow && following.Follow.id) {
          const badge = document.createElement('span');
          badge.textContent = 'Following';
          badge.classList.add('badge', 'bg-primary');
          listItem.appendChild(badge);
        }
        
        followingContainer.appendChild(listItem);
      });
    })
    .catch(error => console.error('Error fetching following:', error));
  }});

// Mahdi's Version

// getUserId().then((userId) => {
//   if (userId) {
//     fetch(`/api/follow/${userId}/followers`)
//     .then((response) => response.json())
//     .then((data) => {
//       const followersContainer = document.querySelector("#followers-container");
//       data.forEach((follower) => {
//         const listItem = document.createElement('li');
//         listItem.textContent = follower.username;
//         if (follower.Follow && follower.Follow.id) {
//           const badge = document.createElement('span');
//           badge.textContent = 'Following';
//           badge.classList.add('badge', 'bg-primary');
//           listItem.appendChild(badge);
//         }
        
//         followersContainer.appendChild(listItem);
//       });
//     })
//     .catch(error => console.error('Error fetching followers:', error));
    
//     fetch(`/api/follow/${userId}/following`)
//     .then((response) => response.json())
//     .then((data) => {
//       const followingContainer = document.querySelector("#following-container");
//       data.forEach((following) => {
//         const listItem = document.createElement('li');
//         listItem.textContent = following.username;
        
//         if (following.Follow && following.Follow.id) {
//           const badge = document.createElement('span');
//           badge.textContent = 'Following';
//           badge.classList.add('badge', 'bg-primary');
//           listItem.appendChild(badge);
//         }
        
//         followingContainer.appendChild(listItem);
//       });
//     })
//     .catch(error => console.error('Error fetching following:', error));
//   }});
  



// fetch('/api/follow/userId/followers')
// .then(response => response.json())
//     .then(data => {
//         const followersContainer = document.querySelector('#followers-container');
//         data.forEach(follower => {
//             const listItem = document.createElement('li');
//             listItem.textContent = follower.username;
    
//             if (follower.Follow && follower.Follow.id) {
//               const badge = document.createElement('span');
//               badge.textContent = 'Following';
//               badge.classList.add('badge', 'bg-primary');
//               listItem.appendChild(badge);
//             }
    
//             followersContainer.appendChild(listItem);
//           });
//         })
//         .catch(error => console.error('Error fetching followers:', error));

//         fetch('/api/follow/userId/following')
//         .then(response => response.json())
//             .then(data => {
//                 const followingContainer = document.querySelector('#following-container');
//                 data.forEach(following => {
//                     const listItem = document.createElement('li');
//                     listItem.textContent = following.username;
            
//                     if (following.Follow && following.Follow.id) {
//                     const badge = document.createElement('span');
//                     badge.textContent = 'Following';
//                     badge.classList.add('badge', 'bg-primary');
//                     listItem.appendChild(badge);
//                     }
            
//                     followingContainer.appendChild(listItem);
//                 });
//                 })
//                 .catch(error => console.error('Error fetching following:', error));