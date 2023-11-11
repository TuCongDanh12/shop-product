// const input = document.querySelectorAll("input");
// console.log(input);

// const btn = document.querySelector("a");

// btn.addEventListener("click", () => {
//     const username = input[0].value
//     const password = input[1].value
//     // console.log(username, password)
//     const account = {username: username, password: password}
//     localStorage.setItem('account', JSON.stringify(account));
// });

const login = () => {
  
  const btnLogin = document.getElementById("btn-login");
  
  
  btnLogin.addEventListener("click", () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log(username, password);
    fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        localStorage.setItem('account', JSON.stringify(json))
        window.location.href = 'admin.html'
      })
      .catch((error) => console.error("Error:", error));
  });
};

login();
