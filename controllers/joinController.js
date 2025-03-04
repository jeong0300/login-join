const users = require("../models/loginModel");
const jwt = require("jsonwebtoken");

const checkJoin = async (req, res) => {
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

module.exports = { checkJoin };
