function check() {
  const id = document.getElementById("id").value;
  const pass = document.getElementById("pass").value;
  const data = { id, pass };

  axios({
    method: "post",
    url: `/login/check`,
    data: data,
  })
    .then((res) => {
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        window.location.href = "/main";
      } else {
        Swal.fire({
          title: res.data,
          icon: "error",
        });
      }
    })
    .catch((e) => {
      Swal.fire({
        title: "서버 오류 발생",
        icon: "error",
      });
    });
}
