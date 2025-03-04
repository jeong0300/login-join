// 중복 확인
function check() {
  const id = document.getElementById("id").value;
  const data = { id };

  if (!id) {
    Swal.fire("아이디를 입력해 주세요.");
    return;
  }

  axios({
    method: "post",
    url: `/join/check`,
    data: data,
  })
    .then((response) => {
      Swal.fire(response.data.message);
    })
    .catch((error) => {
      console.error("중복 확인 오류:", error);
      Swal.fire("서버 오류가 발생했습니다.");
    });
}

// 비밀번호 중복 확인
function passCheck() {
  const pass = document.getElementById("pass").value;
  const passCheck = document.getElementById("passCheck").value;
  const alret = document.getElementById("alret");

  if (pass === "" || passCheck === "") {
    Swal.fire({
      icon: "error",
      text: "비밀번호가 비어있습니다.",
    });
  } else {
    if (pass === passCheck) {
      alret.innerText = "동일한 비밀번호입니다.";
    } else {
      alret.innerText = "비밀번호가 다릅니다.";
    }
  }
}

// 회원가입
function signup() {
  const userId = document.getElementById("id").value;
  const pw = document.getElementById("pass").value;
  const name = document.getElementById("name").value;

  console.log("회원가입:", userId);

  axios
    .post("/join/signup", { userId, pw, name })
    .then((res) => {
      if (res.data.result) {
        alert(res.data.message);

        axios
          .get("/login")
          .then((response) => {
            if (response.status === 200) {
              window.location.href = "/login";
            }
          })
          .catch((error) => {
            Swal.fire({
              title: "페이지 로드 오류",
              icon: "error",
            });
          });
      } else {
        alert(res.data.message);
      }
    })
    .catch((err) => {
      console.error("회원가입 실패", err);
      alert("회원가입 실패");
    });
}
