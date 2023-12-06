// getting the current user data
// let curr_user_id;
let currUser_1;
let postUrl;
fetch("api/sessiondata").then(res=>res.json()).then(res2=>{
    console.log(res2.user.id);
    curr_user_id = res2.user.id;
    fetch(`api/users/${curr_user_id}`).then(res=>res.json()).then(res2=>{
        currUser_1 = res2;

        console.log("currUser_1 :: ");
        console.log(currUser_1.Posts[0]);
        // if(currUser_1.profilePic===null){
        //     currUser_1.profilePic = "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg";
        // }
    });
});



//---------------Vinit's version for uploading Image


// for posts
var myWidget_1 = cloudinary.createUploadWidget({
    cloudName: 'drfd6uhgz', 
    uploadPreset: 'uaaczmxe'}, (error, result) => { 
        if (!error && result && result.event === "success") { 
            res = result.info;
            console.log('Done! Here is the image info: ', result.info);
            postUrl = result.info.url;
        }
        // console.log(currUser_1);
        fetch(`api/users/${curr_user_id}`,{
            // method:"PUT",
            // body:JSON.stringify(currUser_1),
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
                
                //  currUser_1.profilePic = profilePicUrl;
        //  profilePic.setAttribute('src',currUser_1.profilePic);
    }
)

document.querySelector("#upload_post").addEventListener("click", function(){
    myWidget_1.open();
  }, false);

//------------------------------------------------------
document.querySelector("#submitBtn").addEventListener("click",e=>{
    e.preventDefault();
    // console.log(document.querySelector(".form-control"));
    console.log(postUrl);
    
    const postObj = {
        title:document.querySelector(".titleSearchProf").value,
        content:document.querySelector("#content").value,
        imageSource:postUrl,
        user_id:curr_user_id,
    }
    console.log(postObj);
    console.log(postObj);
    fetch("api/posts",{
        method:"POST",
        body:JSON.stringify(postObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            alert("post successful !");
            location.reload();
        }else{
            alert("Something went wrong, Please try again !");
        }
    });
});