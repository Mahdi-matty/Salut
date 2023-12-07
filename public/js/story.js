let storyAdres;
fetch("api/sessiondata").then(res=>res.json()).then(res2=>{
    console.log(res2.user.id);
    curr_user_id = res2.user.id;
    fetch(`api/users/${curr_user_id}`).then(res=>res.json()).then(res2=>{
        currUser = res2;

        console.log("currUser :: ");
        console.log(currUser.Posts[0]);
        // if(currUser.profilePic===null){
        //     currUser.profilePic = "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg";
        // }
    });
});
var myWidget_2 = cloudinary.createUploadWidget({
    cloudName: 'drfd6uhgz', 
    uploadPreset: 'uaaczmxe'}, (error, result) => { 
        if (!error && result && result.event === "success") { 
            res = result;
            console.log('Done! Here is the image info: ', result.info.url);
            storyAdres = result.info.url;
        }
        // console.log(currUser);
        fetch(`api/users/${curr_user_id}`,{
            // method:"PUT",
            // body:JSON.stringify(currUser),
            // headers:{
            //     "Content-Type":"application/json"
            // }
        }).then(res=>{
            console.log(res);
            // if(res.ok){
                //     alert("post successful !");
                //     location.reload();
                // }else{
                    //     alert("Something went wrong, Please try again !");
                    // }
        });
                
                //  currUser.profilePic = profilePicUrl;
        //  profilePic.setAttribute('src',currUser.profilePic);
    }
)
document.querySelector("#uploadStory").addEventListener("click", function(){
    myWidget_2.open();
  }, false);

document.querySelector("#storyBtn").addEventListener("click",e=>{
    e.preventDefault();
    // console.log(document.querySelector(".form-control"));
    console.log(storyAdres);
    
    const postObj = {
        imageSource: storyAdres,
        teller_id: curr_user_id,
    }
    console.log(postObj);
    fetch("/api/story",{
        method:"POST",
        body:JSON.stringify(postObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=> {
      if (res.ok) {
            alert("post successful !");
            location.reload();
        }else{
            alert("Something went wrong, Please try again !");
        }
    });
});


function showImage() {
    fetch("/api/story")
        .then(res =>res.json()).then(res2=>{
            console.log("Received response:", res2)
            const imageNewUse = res2[0].imageSource;
            if (imageNewUse) {
                console.log("Setting image source:", imageNewUse);
                document.getElementById('storyImage').src = imageNewUse;
            } else {
                console.error("No image source found in the response");
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}
    
    showImage();

        // Start countdown to hide the image after 5 seconds (visible for 5 seconds)
        document.querySelector("#showStory").addEventListener("click", function(){
            document.getElementById('storyContainer').style.display = 'inline';
            setTimeout(function () {
            document.getElementById('storyContainer').style.display = 'none';
        }, 5000); // 5 seconds in milliseconds
    });