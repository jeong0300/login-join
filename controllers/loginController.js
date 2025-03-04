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

const moveMain = (req, res) => {
  res.render("main_jwt");
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

// 토큰 검증
const verify = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ result: false, message: "토큰 없음" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ result: false, message: "토큰 없음" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ result: true, name: decoded.name });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ result: false, message: "세션이 만료되었습니다." });
    }
    res.status(401).json({ result: false, message: "토큰이 유효하지 않음" });
  }
};

module.exports = { moveLogin, moveMain, checkLogin, verify };
