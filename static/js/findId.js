function find() {
  const area = document.getElementById("area").value;
  const middle = document.getElementById("middle").value;
  const last = document.getElementById("last").value;

  const userDataAll = JSON.parse(localStorage.getItem("userData"));

  const areaNum = userDataAll.filter((user) => user.areaCode === area);
  const middleNum = userDataAll.filter((user) => user.middleNumber === middle);
  const lastNum = userDataAll.filter((user) => user.lastNumber === last);

  if (areaNum.length === 0 || middleNum.length === 0 || lastNum.length === 0) {
    Swal.fire({
      icon: "error",
      text: "작석된 번호로 가입된 유저가 없습니다.",
    });
  } else {
    const user = userDataAll.find(
      (user) =>
        user.areaCode === area &&
        user.middleNumber === middle &&
        user.lastNumber === last
    );

    Swal.fire({
      icon: "success",
      text: `해당 유저의 아이디는 ${user.id} 입니다.`,
    });
  }
}
