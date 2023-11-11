// if(localStorage.getItem('account')) {
//     // Nếu có, chuyển đến trang khác
//     console.log(true)
//     window.location.href = 'admin.html';
// } else {
//     console.log(false)
//     if(window.location.pathname=='/index.html'){ return}
//     // Nếu không, chuyển đến trang đăng nhập
//     else{window.location.href = 'index.html';}
// }


function checkRedirect() {
    if (localStorage.getItem('account')) {
      // Nếu có, chuyển đến trang khác
      window.location.href = 'admin.html';
    } else {
      if (window.location.pathname === '/index.html') {
        // Nếu đang ở trang index.html, không cần chuyển hướng
        return;
      } else {
        // Nếu không, chuyển đến trang đăng nhập
        window.location.href = 'index.html';
      }
    }
  }
  
  // Gọi hàm để thực hiện kiểm tra và chuyển hướng
  checkRedirect();