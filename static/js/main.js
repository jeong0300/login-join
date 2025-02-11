fetch("/userinfo")
  .then((response) => response.json())
  .then((data) => {
    let userDataAll = JSON.parse(localStorage.getItem("userData")) || [];

    const id = userDataAll.filter((user) => user.id === data.id);
    const pw = userDataAll.filter((user) => user.pass === data.pass);

    if (id.length === 0 || pw.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "해당 유저가 없습니다.",
      }).then(() => {
        window.location.href = "/";
      });
    } else {
      const user = userDataAll.find(
        (user) => user.id === data.id && user.pass === data.pass
      );
      if (user) {
        const alert = document.getElementById("alert");
        alert.innerText = `${user.name} 님 환영합니다.`;
      }
    }
  })
  .catch((e) => {
    console.log("error!", e);
  });
