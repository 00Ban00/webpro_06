const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  let judgement = '';
  
  if (hand === cpu) {
    judgement = '引き分け';
  } else if (
    (hand === 'グー' && cpu === 'チョキ') ||
    (hand === 'チョキ' && cpu === 'パー') ||
    (hand === 'パー' && cpu === 'グー')
  ) {
    judgement = '勝ち';
    win += 1; 
  } else {
    judgement = '負け';
  }
  
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/dice", (req, res) => {
  let total = Number(req.query.total) || 0;
  let dice1 = req.query.dice1;
  let dice2 = req.query.dice2;
  let diceMessage = '';
  let gameEnd = false;

  if (!dice1 && !dice2) {
    dice1 = 1; 
    res.render('dice', {
      dice1: dice1,
      dice2: null,
      total: total,
      diceMessage: '最初に振ったサイコロの目は 1 です。',
      gameEnd: false
    });
  } else {
    
    const userDice = Math.floor(Math.random() * 6) + 1; 

    if (userDice === 1) {
      diceMessage = '1が出たので、ゲーム継続！';
      total += 1;  
    } else {
      diceMessage = '1以外の目が出たので、ゲーム終了です。';
      gameEnd = true;  
    }

    res.render('dice', {
      dice1: dice1,  
      dice2: userDice,  
      total: total,
      diceMessage: diceMessage,
      gameEnd: gameEnd
    });
  }
});

app.get('/zodiac', (req, res) => {
  const date = new Date(req.query.date);
  const month = date.getMonth() + 1; 
  const day = date.getDate();

  let zodiac = '不明';

  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) zodiac = '水瓶座';
  else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) zodiac = '魚座';
  else if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) zodiac = '牡羊座';
  else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) zodiac = '牡牛座';
  else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) zodiac = '双子座';
  else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) zodiac = '蟹座';
  else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) zodiac = '獅子座';
  else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) zodiac = '乙女座';
  else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) zodiac = '天秤座';
  else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) zodiac = '蠍座';
  else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) zodiac = '射手座';
  else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) zodiac = '山羊座';

  res.send(`あなたの星座は${zodiac}です。`);
});

app.get("/zodiac-form", (req, res) => {
  res.render('zodiac-form');
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
