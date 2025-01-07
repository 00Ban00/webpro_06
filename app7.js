"use strict";
const express = require("express");
const app = express();

let bbs = [];  // 本来はDBMSを使用するが，今回はこの変数にデータを蓄える

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1: message1, greet2: message2 });
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1: "Hello world", greet2: "Bon jour" });
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename: "./public/Apple_logo_black.svg", alt: "Apple Logo" });
});

app.get("/luck", (req, res) => {
  const num = Math.floor(Math.random() * 6 + 1);
  let luck = '';
  if (num == 1) luck = '大吉';
  else if (num == 2) luck = '中吉';
  res.render('luck', { number: num, luck: luck });
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number(req.query.win);
  let total = Number(req.query.total);
  const num = Math.floor(Math.random() * 3 + 1);
  let cpu = '';
  if (num == 1) cpu = 'グー';
  else if (num == 2) cpu = 'チョキ';
  else cpu = 'パー';
  let judgement = '勝ち';
  win += 1;
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render('janken', display);
});

app.get("/get_test", (req, res) => {
  res.json({
    answer: 0
  });
});

app.get("/add", (req, res) => {
  const num1 = Number(req.query.num1);
  const num2 = Number(req.query.num2);
  res.json({ answer: num1 + num2 });
});

app.post("/add", (req, res) => {
  const num1 = Number(req.body.num1);
  const num2 = Number(req.body.num2);
  res.json({ answer: num1 + num2 });
});

// BBS関連
app.post("/post", (req, res) => {
  const name = req.body.name;
  const message = req.body.message;
  const timestamp = req.body.timestamp;  // 投稿日時を受け取る
  console.log([name, message, timestamp]);

  const newPost = { 
      id: bbs.length + 1, 
      name: name, 
      message: message, 
      likes: 0,
      timestamp: timestamp,  // 投稿日時を格納
      replies: []  // 返信を格納する配列
  };
  bbs.push(newPost);
  res.json({ number: bbs.length });
});

// 返信処理
app.post("/reply", (req, res) => {
  const id = Number(req.body.id);
  const message = req.body.message;
  const post = bbs.find(p => p.id === id);

  if (post) {
      const reply = {
          name: "返信",  // ここはユーザー名に変更可能
          message: message
      };
      post.replies.push(reply);
      res.json({ reply: reply });
  } else {
      res.status(404).send("Post not found");
  }
});

// いいね処理
app.post("/like", (req, res) => {
  const id = Number(req.body.id);
  console.log("Like for post ID:", id);

  const post = bbs.find(p => p.id === id);
  if (post) {
      post.likes += 1;
      res.json(post);  // 更新された投稿情報を返す
  } else {
      res.status(404).send("Post not found");
  }
});

// 投稿削除
app.post("/delete", (req, res) => {
  const id = Number(req.body.id);
  console.log("Delete post ID:", id);

  const postIndex = bbs.findIndex(p => p.id === id);
  if (postIndex !== -1) {
      bbs.splice(postIndex, 1);  // 投稿を削除
      res.json({ message: "Post deleted successfully" });
  } else {
      res.status(404).send("Post not found");
  }
});

// 投稿チェック
app.post("/check", (req, res) => {
  res.json({ number: bbs.length });
});

// 投稿を読み込む
app.post("/read", (req, res) => {
  const start = Number(req.body.start);
  console.log("read -> " + start);
  if (start === 0) res.json({ messages: bbs });
  else res.json({ messages: bbs.slice(start) });
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
