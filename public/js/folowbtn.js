// let curr_user_id;
document.addEventListener("DOMContentLoaded", function () {
  fetch("/sessiondata").then(res=>res.json()).then(res2=>{
      console.log(res2.user.id);
      curr_user_id = res2.user.id;
  });
  const userNom = document.querySelector(".userNomeSec").textContent.trim();
  const getUserIDByUsername = (username) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!username) {
          reject(new Error('Username is null or undefined.'));
          return;
        }
  
        const response = await fetch(`/api/users/getUserIdByUsername/${username}`);
        const data = await response.json();
  
        if (response.ok) {
          const userId = data.userId;
          console.log('User ID:', userId);
          resolve(userId);
        } else {
          console.error('Failed to get user ID:', data.error);
          reject(new Error('Failed to get user ID'));
        }
      } catch (error) {
        console.error('Error during fetch:', error);
        reject(error);
      }
    });
  };
  
  const followBtn= document.querySelector("#followBtn");
    followBtn.addEventListener("click", async()=>{
      try {
        const userIdFollow= await getUserIDByUsername(userNom);
        const response = await fetch('/api/follow', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            following_user_id: userIdFollow,
            followed_user_id: curr_user_id
          }),
        });
        // console.log(response);
  
        const data = await response.json();
         if (response.ok) {
          console.log('Successfully followed user:', data);
            } else {
          console.error('Failed to follow user:', data.msg);
           }
      } catch (error) {
        console.error('Error:', error.message);
      }
    });
  })