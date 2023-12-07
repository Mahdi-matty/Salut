let res;
let profilePicUrl;
let currUser;

// let curr_user_id;
fetch("api/sessiondata").then(res=>res.json()).then(res2=>{
    curr_user_id = res2.user.id;
    // console.log(curr_user_id);
    fetch(`api/users/${curr_user_id}`).then(res=>res.json()).then(res2=>{
        currUser = res2;
        // console.log(currUser.Posts[0]);
        if(currUser.profilePic===null){
            currUser.profilePic = "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg";
        }
        console.log(`currUser :: ${currUser.profilePic}`);
    });
});

let profilePic = document.querySelector(`.profilePic`);
// for profile pic  
var myWidget = cloudinary.createUploadWidget({
    cloudName: 'drfd6uhgz', 
    uploadPreset: 'uaaczmxe'}, (error, result) => { 
        if (!error && result && result.event === "success") { 
            res = result.info;
            console.log('Done! Here is the image info: ', result.info);
            currUser.profilePic = result.info.url;
        }
        // console.log(currUser);
        fetch(`api/users/${curr_user_id}`,{
            method:"PUT",
            body:JSON.stringify(currUser),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>{
            // console.log(res);
            // if(res.ok){
                //     alert("post successful !");
                //     location.reload();
                // }else{
                    //     alert("Something went wrong, Please try again !");
                    // }
                    profilePic.setAttribute('src',currUser.profilePic);
        });
                
                //  currUser.profilePic = profilePicUrl;
    }
)
                    
document.getElementById("upload_widget").addEventListener("click", function(){
    myWidget.open();
  }, false);



// // for posts
// var myWidget_1 = cloudinary.createUploadWidget({
//     cloudName: 'drfd6uhgz', 
//     uploadPreset: 'uaaczmxe'}, (error, result) => { 
//         if (!error && result && result.event === "success") { 
//             res = result.info;
//             console.log('Done! Here is the image info: ', result.info);
//             currUser.profilePic = result.info.url;
//         }
//         console.log(currUser);
//         fetch(`api/users/${curr_user_id}`,{
//             method:"PUT",
//             body:JSON.stringify(currUser),
//             headers:{
//                 "Content-Type":"application/json"
//             }
//         }).then(res=>{
//             console.log(res);
//             // if(res.ok){
//                 //     alert("post successful !");
//                 //     location.reload();
//                 // }else{
//                     //     alert("Something went wrong, Please try again !");
//                     // }
//         });
                
//                 //  currUser.profilePic = profilePicUrl;
//          profilePic.setAttribute('src',currUser.profilePic);
//     }
// )

// document.querySelector("#upload_post").addEventListener("click", function(){
//     myWidget.open();
//   }, false);