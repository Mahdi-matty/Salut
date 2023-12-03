// getting the current user data
let curr_user_id;
fetch("api/sessiondata").then(res=>res.json()).then(res2=>{
    console.log(res2.user.id);
    curr_user_id = res2.user.id;
});

document.querySelector("#submitBtn").addEventListener("click",e=>{
    e.preventDefault();
    console.log(document.querySelector(".form-control"));
    const postObj = {
        title:document.querySelector(".titleSearchProf").value,
        content:document.querySelector("#content").value,
        user_id:curr_user_id
    }
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