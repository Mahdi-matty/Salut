document.querySelector("#loginForm").addEventListener("submit",e=>{
    e.preventDefault();
    const userObj = {
        username:document.querySelector("#username").value,
        password:document.querySelector("#password").value
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