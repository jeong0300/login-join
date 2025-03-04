const bcrypt = require("bcryptjs");
const { JwtUser } = require("../models/joinModel");

const checkJoin = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).send({ message: "아이디를 입력하세요." });
    }

    const user = await JwtUser.findOne({ where: { userId: id } });

    if (user) {
      return res.send({ message: "중복된 아이디입니다." });
    }

    res.send({ message: "사용 가능한 아이디입니다." });
  } catch (error) {
    console.error("중복 확인 오류:", error);
    res
      .status(500)
      .send({ message: "서버 오류가 발생했습니다.", error: error.message });
  }
};

const signupProcess = async (req, res) => {
  const { userId, pw, name } = req.body;

  console.log("ddd ", req.body);

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPw = await bcrypt.hash(pw, salt);

    console.log("salt :", salt);
    console.log("hashedPw :", hashedPw);

    const user = await JwtUser.create({ userId, pw: hashedPw, name });
    console.log("user", user);

    if (!user) {
      return res.status(400).json({ result: false, message: "회원가입 실패" });
    }
    return res.status(200).json({ result: true, message: "회원가입 성공" });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ result: false, message: "회원가입 실패" });
  }
};

module.exports = { checkJoin, signupProcess };
