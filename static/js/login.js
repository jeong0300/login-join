// 로컬 스토리지에 저장
fetch("/userinfo")
  .then((response) => response.json())
  .then((data) => {
    let userDataAll = JSON.parse(localStorage.getItem("userData")) || [];

    const id = userDataAll.filter((user) => user.id === data.id);

    if (id.length === 0) {
      userDataAll.push(data);
      localStorage.setItem("userData", JSON.stringify(userDataAll));
    }
  })
  .catch((e) => {
    console.log("error!", e);
  });
