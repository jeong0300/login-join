(async function () {
  const alertBox = document.querySelector("#alert");
  const token = localStorage.getItem("token");

  console.log("Stored Token:", token); // 로컬 스토리지에 저장된 토큰 확인
  if (!token) {
    Swal.fire({
      title: "로그인이 필요합니다.",
      icon: "warning",
      confirmButtonText: "확인",
    }).then(() => {
      window.location.href = "/login";
    });
    return;
  }

  try {
    // 토큰을 Authorization 헤더에 포함하여 요청
    const res = await axios.post(
      "/login/verify",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log("Authorization header sent:", `Bearer ${token}`);

    if (res.data.result) {
      alertBox.innerHTML = `<p>${res.data.name}님, 환영합니다!</p>`;
    } else {
      throw new Error("Invalid token");
    }
  } catch (error) {
    Swal.fire({
      title: "세션이 만료되었습니다.",
      text: "다시 로그인해주세요.",
      icon: "error",
      confirmButtonText: "확인",
    }).then(() => {
      logout();
    });
  }
})();

function signOut() {
  localStorage.removeItem("token");

  Swal.fire({
    title: "로그아웃 성공",
    icon: "success",
  }).then(() => {
    window.location.href = "/login";
  });
}
