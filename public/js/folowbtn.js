let curr_user_id;
fetch("api/sessiondata").then(res=>res.json()).then(res2=>{
    console.log(res2.user.id);
    curr_user_id = res2.user.id;
});

const followBtn= document.querySelector("#followBtn");
  followBtn.addEventListener("click", async()=>{
    try {

      const response = await fetch('/api/follow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          followed_user_id: curr_user_id,
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