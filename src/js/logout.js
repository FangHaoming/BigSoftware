function logout(){
    delCookie("identify");
    window.location.href = "./index.html";
}