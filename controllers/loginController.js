const users = require("../models/loginModel");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "C2C19C33C19C4E7EC5FA16AF267AC";

// 로그인 페이지로 이동
const moveLogin = async (req, res) => {
  try {
    const user = await users.getAllUsers();
    res.render("login_jwt", { user });
  } catch (error) {
    console.error("DB 조회 오류:", error);
  }
};

// 아이디, 비밀번호 체크
const checkLogin = async (req, res) => {
  try {
    const id = req.body.id;
    const pass = req.body.pass;

    const user = await users.getUserById(id);
    if (!user) {
      return res.send("존재하지 않는 계정입니다.");
    }

    if (pass !== user.pw) {
      return res.send("비밀번호가 일치하지 않습니다.");
    }
    const token = jwt.sign({ id: user.id, name: user.name }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.send({ token });
  } catch (error) {
    console.error("로그인 오류:", error);
  }
};

module.exports = { moveLogin, checkLogin };
