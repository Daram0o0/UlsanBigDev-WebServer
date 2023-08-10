const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const filePath = 'data.json';

app.use(cors());
app.use(express.json());

let portfolio = [];

// const admin =
// {
//   userId: "admin",
//   userPw: "1234",
// }

// 서버 시작 시 데이터 파일에서 읽어와서 portfolio 배열에 로드
fs.readFile(filePath, 'utf8', (err, data) => {
  if (!err) {
    try {
      portfolio = JSON.parse(data);
    } catch (parseError) {
      console.error(parseError);
    }
  } else {
    console.error(err);
  }
});

app.get('/', (req, res) => {
  res.send("home");
});

// app.get('/admin', (req, res) => {
//   res.send(admin)
// })

app.get('/portfolio', (req, res) => {
  res.json(portfolio);
});

app.post('/portfolioInsert', (req, res) => {
  const reqName = req.body.name
  const reqTitle = req.body.title
  const reqContent = req.body.content
  const reqStartDate = req.body.startDate
  const reqEndDate = req.body.endDate
  const reqHeadCount = req.body.headCount
  const reqList = req.body.list

  for (let i = 0; i < portfolio.length; i++) {
    if (portfolio[i].name === reqName) {
      portfolio[i].portfolioForm.push({
        title: reqTitle,
        content: reqContent,
        startDate: reqStartDate,
        endDate: reqEndDate,
        headCount: reqHeadCount,
        list: reqList
      })
      res.send({ msg: "완료" })
    }
  }

  savePortfolioToFile();

  console.log("success");
  res.send({ message: "success" });
});

app.get('/portfolio/addMember', (req, res) => {
  const reqName = req.query.name;
  portfolio.push({
    name: reqName,
    portfolioForm: []
  });

  savePortfolioToFile();

  console.log("success");
  res.send({ msg: "완료" });
});

app.listen(5050, () => {
  console.log("5050 port open");
});

// portfolio 데이터를 파일에 저장하는 함수
function savePortfolioToFile() {
  const jsonFile = JSON.stringify(portfolio);
  fs.writeFile(filePath, jsonFile, 'utf8', (err) => {
    if (err) {
      console.log(err);
    }
  });
}
