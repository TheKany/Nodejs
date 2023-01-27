import express, { json, urlencoded } from "express";
import cors from "cors";
import helmet from "helmet";
import dayjs from "dayjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

let users = [
  {
    id: 1,
    name: "test1",
    age: 12,
  },
];

const app = express();

// 미들웨어 등록
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "700mb" }));

// GET Method
// 유저 정보 가져오기
// 성공 status: 200
app.get("/users", (req, res) => {
  res.status(200).json({ users });
});

// POST Method
// 유저 생성
// 성공 status: 201
app.post("/users", (req, res) => {
  const { name, age } = req.body;

  users.push({
    id: new Date().getTime(),
    name,
    age,
  });

  res.status(201).json({ users });
});

// PATCH Method (일부 정보만 업데이트하는 경우!)
// 유저 수정
// 성공 status: 204
// req.params.id
app.patch("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;
  const targetUserIdx = users.findIndex((user) => user.id === Number(id));

  users[targetUserIdx] = {
    id: users[targetUserIdx].id,
    name: name ?? users[targetUserIdx].name,
    age: age ?? users[targetUserIdx].age,
  };

  res.status(204).json({});
});

// DELETE Method
// 유저 삭제
// 성공 status: 204
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  const deleteUsers = users.filter((user) => user.id !== Number(id));
  users = deleteUsers;

  res.status(204).json({});
});

app.get("/", (req, res) => {
  res.send("Express");
});

app.listen(8000, () => {
  console.log("서버를 시작합니다.");
});

/* dayjs
const today = new Date();
const todayToDayjs = dayjs(today).format("YYYY-MM-DD");
console.log(`원래 날짜 표기: ${today}`);
console.log(`dayjs 날짜 표기: ${todayToDayjs}`);
 */

/* bcrypt와 jwt
const password = "1234";
const hashedPW = bcrypt.hashSync(password, 10);
console.log({ hashedPW });

const token = jwt.sign("1234", "시크릿키");
console.log({ token });
*/
