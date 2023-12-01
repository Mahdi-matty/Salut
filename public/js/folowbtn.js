const followBtn= document.querySelector("#followBtn");
  followBtn.addEventListener("click", async()=>{
    try {
      const userIdToFollow = '?';
      const response = await fetch('/follow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          followed_user_id: userIdToFollow,
        }),
      });

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