function find() {
  const alret = document.getElementById("alret");
  const id = document.getElementById("id").value;

  const userDataAll = JSON.parse(localStorage.getItem("userData"));

  const idNum = userDataAll.filter((user) => user.id === id);

  if (id === "") {
    Swal.fire({
      icon: "error",
      text: "아이디가 비어있습니다",
    });
  } else if (idNum.length === 0) {
    Swal.fire({
      icon: "error",
      text: "해당 아이디로 가입된 유저가 없습니다.",
    });
  } else {
    const user = userDataAll.find((user) => user.id === id);

    Swal.fire({
      icon: "success",
      text: `해당 유저의 비밀번호는 ${user.pass} 입니다.`,
    });
  }
}
