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
    // fetch(`/api/follow/${userId}/followers/showFollower`);
    
    fetch(`/api/follow/${userId}/followers`)
    .then(response =>response.json())
    .then(data => {
      follower = data[0].followers;
      console.log("Listen !!")
      console.log(follower);
      
      const followersContainer = document.querySelector("#followers-container");
      const followerList = document.createElement(`ul`);
      const testEl = document.createElement('p');
      testEl.textContent = "Do you work inside front end JS?";
      // followersContainer.append(testEl);

      for (let i = 0; i < data.length; i++) {
        // console.log(data[i]);
        
        console.log(" FRONT END !!");
        console.log(data[i]);
        const listItem = document.createElement('li');

        //start from here
        
        listItem.textContent = data[i].followers.username;

//not sure yet

        // if (follower.Follow && follower.Follow.id) {
        //   const badge = document.createElement('span');
        //   badge.textContent = 'Following';
        //   badge.classList.add('badge', 'bg-primary');
        //   listItem.appendChild(badge);
        // }
        
        followerList.appendChild(listItem);
        // console.log(`I am sending a User !! ${userId}`)
      }
      data.forEach((something) => {
//         console.log(" FRONT END !!");
//         console.log(data[something]);
//         const listItem = document.createElement('li');

//         //start from here
        
//         listItem.textContent = follower.followers.username;

// //not sure yet

//         // if (follower.Follow && follower.Follow.id) {
//         //   const badge = document.createElement('span');
//         //   badge.textContent = 'Following';
//         //   badge.classList.add('badge', 'bg-primary');
//         //   listItem.appendChild(badge);
//         // }
        
//         followerList.appendChild(listItem);
//         console.log(`I am sending a User !! ${userId}`)
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