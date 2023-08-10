const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')
const bodyParser = require('body-parser');
const filePath = 'data.json';

app.use(cors())
app.use(express.json())
app.use(bodyParser.json());

const portfolio = [
]

app.get('/', (req, res) => {
  res.send("home");
})

app.get('/portfolio', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send({ error: 'An error occurred while reading the data file.' });
      return;
    }

    try {
      const parsedData = JSON.parse(data);
      res.json(parsedData);
    } catch (parseError) {
      console.error(parseError);
      res.status(500).send({ error: 'An error occurred while parsing the data.' });
    }
  });
});


app.post('/portfolioInsert', (req, res) => {
  // const reqName = req.body.name
  // const reqPortfolioForm = req.body.portfolioForm
  const reqName = req.body.name
  const reqPort = req.body.portfolioForm
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

  const jsonFile = JSON.stringify(portfolio);
  fs.writeFile(filePath, jsonFile, 'utf8', (err) => {
    if (err) {
      console.log(err);
      res.send({ msg: err });
    } else {
      console.log("success");
      res.send({ message: "success" });
    }
  })

  // res.send(reqTitle)
  // console.log(reqTitle)
  // console.log(reqList)
  // console.log("이름", reqName, "/포폴", reqPort)

})

app.get('/portfolio/addMember', (req, res) => {
  const reqName = req.query.name
  portfolio.push({
    name: reqName,
    portfolioForm: []
  })
  res.send({ msg: "완료" })
  // const jsonFile = JSON.stringify(portfolio);

  // fs.writeFile(filePath, jsonFile, 'utf8', (err) => {
  //   if (err) {
  //     console.log(err);
  //     res.send({ msg: err });
  //   } else {
  //     console.log("success");
  //     res.send({ message: "success" });
  //   }
  // })
})

app.listen(5050, () => { console.log("5050 port open") })