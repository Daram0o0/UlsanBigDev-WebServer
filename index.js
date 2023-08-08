const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')

app.use(cors())
app.use(express.json())

const portfolio = [
]

app.get('/', (req, res) => {
  res.send("home");
})

app.get('/portfolio', (req, res) => {
  res.send(portfolio);
})

app.post('/portfolioAdd', (req, res) => {
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
      }
      )
    }
  }

  res.send(reqTitle)
  console.log(reqTitle)
  console.log(reqList)
  console.log("이름", reqName, "/포폴", reqPort)

})

app.listen(5050, () => { console.log("5050 port open") })