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

// 도메인
const domainListEl = document.querySelector("#domain-list");
const domainInputEl = document.querySelector("#domain-txt");

domainListEl.addEventListener("change", (event) => {
  // option에 있는 도메인 선택 시
  if (event.target.value !== "type") {
    // 선택한 도메인을 input에 입력하고 disabled
    domainInputEl.value = event.target.value;
    domainInputEl.disabled = true;
  } else {
    // 직접 입력 시
    domainInputEl.value = "";
    domainInputEl.disabled = false;
  }
});
