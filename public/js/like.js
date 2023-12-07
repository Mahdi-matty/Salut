// const liksBtns = document.querySelector(".likeBtn");
// const userNomLike = document.querySelector(".userNomeSec");

// const getUserId = async () => {
//   try {
//     const response = await fetch("/api/sessiondata");
//     const data = await response.json();
//     return data.user.id;
//   } catch (error) {
//     console.error("Error fetching user ID:", error);
//     return null;
//   }
// };

// const getUserIDByUsername = (username) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       if (!username) {
//         reject(new Error('Username is null or undefined.'));
//         return;
//       }

//       const response = await fetch(`/api/users/getUserIdByUsername/${username}`);
//       const data = await response.json();

//       if (response.ok) {
//         const userId = data.userId;
//         console.log('User ID:', userId);
//         resolve(userId);
//       } else {
//         console.error('Failed to get user ID:', data.error);
//         reject(new Error('Failed to get user ID'));
//       }
//     } catch (error) {
//       console.error('Error during fetch:', error);
//       reject(error);
//     }
//   });
// };

// liksBtns.addEventListener("click", async function(event) {
//   const likeBtn = event.target.closest(".likeBtn");
//   if (!likeBtn) {
//     console.log('hello world');
//     return;
//   }

//   const listItem = this.closest('ul');
//   console.log('Found list item:', listItem);

//   if (!listItem) {
//     console.error('Error: Could not find list item');
//     return;
//   }

//   const idInNeed = document.querySelector(".idInNeed").textContent;
//   const userIdForLike = await getUserIDByUsername(userNomLike.textContent);

//   const createLikeObj = async () => {
//     const userId = await getUserId();

//     if (userId !== null) {
//       const likeObj = {
//         Likes_user_id: userId,
//         is_liked: true,
//         is_disliked: false,
//         user_id: userIdForLike, // Add the userIdForLike here
//         post_id: idInNeed,
//       };
//       console.log(likeObj);
//       try {
//         const response = await fetch(`/api/likes`, {
//           method: 'post',
//           body: JSON.stringify(likeObj),
//           headers: {
//             "Content-Type": "application/json"
//           }
//         });
//         if (response.ok) {
//           const likeCountElement = listItem.querySelector(".likeCount");
//           if (likeCountElement) {
//             const currentLikeCount = parseInt(likeCountElement.textContent, 10) || 0;
//             likeCountElement.textContent = currentLikeCount + 1;
//           } 
//         } else {
//           console.log("error");
//         }
//       } catch (error) {
//         console.error('Error during delete operation', error);
//       }
//     } else {
//       console.error("User ID is null. Unable to create likeObj.");
//     }
//   };

//   createLikeObj();
// });






 // Function to handle the button click
  async function handleLikePost() {
    try {
      // Check if the button has the correct class
      if (event.target.classList.contains('likeBtn')) {
        // Display a success message
        alert('You Liked a Post!!');
      } else {
        // If the button doesn't have the correct class, throw an error
        throw new Error("Can't like post");
      }
    } catch (error) {
      // Display an error message
      alert(error.message);
    }
  }

  // Attach the handleLikeClick function to the click event of the document
  document.addEventListener('click', handleLikePost);







// // Function to handle the button click
// async function handleLikePost() {
//     try {
//       // Check if the button has the correct class
//       if (event.target.classList.contains('likeBtn')) {
        
//         const post_id = /* logic to get the post ID */;
  
//         // Update the Likes model to indicate that the post is liked
//         const likeRecord = await Likes.create({
//           Likes_user_id: /* the user ID who clicked the like button */,
//           is_liked: true,
//           user_id: /* the user ID who created the post */,
//           post_id: post_id,
//           created_at: new Date(),
//         });
  
        
//         alert('You Liked a Post!!');
  
//         // additional actions here, such as updating new like status
//       } else {
//         // If the button doesn't have the correct class, throw an error
//         throw new Error("Can't like post");
//       }
//     } catch (error) {
//       // Display an error message
//       alert(error.message);
//     }
//   }
  

//   document.addEventListener('click', handleLikePost);
  