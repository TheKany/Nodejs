import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Express");
});

app.listen(8000, () => {
  console.log("서버를 시작합니다.");
});
