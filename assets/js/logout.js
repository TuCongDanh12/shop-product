const logout = document.querySelector(".login a");

logout.addEventListener("click", ()=>{
    localStorage.clear();
})