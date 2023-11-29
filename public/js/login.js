document.querySelector("#loginForm").addEventListener("click",e=>{
    e.preventDefault();
    const userObj = {
        username:document.querySelector("#exampleInputEmail1").value,
        password:document.querySelector("#exampleInputPassword1").value
    }
    fetch("/api/users/login",{
        method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.href = "/profile";
        } else {
            alert("trumpet sound")
        }
    })

});