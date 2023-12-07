const getUserId_1 = async() => {
    try {
        const response = await fetch("/api/sessiondata");
        const data = await response.json();
        return data.user.id;
    } catch (error) {
        console.error("Error fetching user ID:", error);
        return null;
    }
};

getUserId_1().then((userId) => {
    if (userId) {
        //   fetch(`/api/followedBy/${userId}/followers/showFollower`);

        fetch(`/api/followedBy/${userId}`)
            .then(response => response.json())
            .then(data => {
                console.log("Listen Folower !!")
                console.log(data[0].FollowId);

                const followersContainer = document.querySelector("#followers-container");
                const followerList = document.createElement(`ul`);
                const testEl = document.createElement('p');
                testEl.textContent = "Do you work inside front end JS?";
                // followersContainer.append(testEl);


                for (let i = 0; i < data.length; i++) {
                    // console.log(data[i]);
                    fetch(`/api/users/${data[i].FollowId}`).then(res => res.json()).then(res2 => {
                        console.log(`I am a follower of !! i : ${i}`);
                        follower = res2.username;
                        console.log(follower);
                        const listItem = document.createElement('li');
                        listItem.textContent = follower;
                        followerList.appendChild(listItem);
                    });

                    //   console.log(" FRONT END !!");
                    //   console.log(data[i]);

                    //start from here


                    //not sure yet

                    // if (follower.Follow && follower.Follow.id) {
                    //   const badge = document.createElement('span');
                    //   badge.textContent = 'Following';
                    //   badge.classList.add('badge', 'bg-primary');
                    //   listItem.appendChild(badge);
                    // }

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

        //   fetch(`/api/followedBy/${userId}`)
        //   .then((response)=>response.json())
        //   .then((data) => {
        //     const followingContainer = document.querySelector("#followers-container");
        //     data.forEach((following) => {
        //       const listItem = document.createElement('li');
        //       listItem.textContent = following.username;

        //       if (following.Follow && following.Follow.id) {
        //         const badge = document.createElement('span');
        //         badge.textContent = 'Following';
        //         badge.classList.add('badge', 'bg-primary');
        //         listItem.appendChild(badge);
        //       }

        //       followingContainer.appendChild(listItem);
        //     });
        //   })
        //   .catch(error => console.error('Error fetching following:', error));
    }
});