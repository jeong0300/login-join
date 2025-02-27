const mysql = require("mysql2/promise");

// DB 연결
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "111111",
  database: "user",
});

const getAllUsers = async () => {
  try {
    const query = "SELECT * FROM jwtuser";
    const [rows] = await pool.query(query);

    return rows;
  } catch (error) {
    console.error("DB 조회 오류:", error);
  }
};

const getUserById = async (id) => {
  try {
    const query = "SELECT * FROM jwtuser WHERE id = ?";
    const [rows] = await pool.query(query, [id]);
    console.log(rows);
    return rows[0];
  } catch (error) {
    console.error("DB 조회 오류:", error);
    throw error;
  }
};

module.exports = { getAllUsers, getUserById };
