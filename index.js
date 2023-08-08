const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')

app.use(cors())
app.use(express.json())

const portfolio = [
  {
    name: "김아무개",
    portfolioForm: [
      {
        title: "김씨네",
        content: "김씨네 이야기",
        startDate: "2023-08-03",
        endDate: "2023-08-20",
        headCount: 2,
        list: ["김아무개", "박아무개"]
      },
      {
        title: "김씨네222",
        content: "김씨네 이야기222",
        startDate: "2023-08-21",
        endDate: "2023-08-30",
        headCount: 3,
        list: ["김아무개", "박아무개", "최아무개"]
      },
    ]
  },
  {
    name: "박아무개",
    portfolioForm: [
      {
        title: "박씨네",
        content: "박씨네 이야기",
        startDate: "2023-08-03",
        endDate: "2023-08-20",
        headCount: 1,
        list: ["박아무개"]
      },
    ]
  },
  {
    name: "이아무개",
    portfolioForm: [
    ]
  },
  {
    name: "최아무개",
    portfolioForm: [
    ]
  },
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