import express from "express";
import cors from "cors";
import helmet from "helmet";
import dayjs from "dayjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();

// 미들웨어 등록
app.use(
  cors({
    origin: "*", // 도메인, * 표시의 경우 전체
  })
);
app.use(helmet());

const today = new Date();
const todayToDayjs = dayjs(today).format("YYYY-MM-DD");
console.log(`원래 날짜 표기: ${today}`);
console.log(`dayjs 날짜 표기: ${todayToDayjs}`);

// bcrypt와 jwt
const password = "1234";
const hashedPW = bcrypt.hashSync(password, 10);
console.log({ hashedPW });

const token = jwt.sign("1234", "시크릿키");
console.log({ token });

app.get("/", (req, res) => {
  res.send("Express");
});

app.listen(8000, () => {
  console.log("서버를 시작합니다.");
});
