const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('data.json')
const middlewares = jsonServer.defaults()
const port = 3001

server.use(middlewares)
server.use(jsonServer.bodyParser)

// Middleware для обработки /get_tg_user?user_id=1
server.get('/get_tg_user', (req, res) => {
  const userId = req.query.user_id
  if (!userId) {
    return res.status(400).json({
      detail: "User not found."
    })
  }
  const db = router.db
  const user = db.get('users').find({ user_id: parseInt(userId) }).value()
  if (user) {
    res.json(user)
  } else {
    res.status(404).json({
      detail: "User not found."
    })
  }
})

// Middleware для обработки /get_task?user_id=1
server.get('/get_task', (req, res) => {
  const userId = req.query.user_id
  if (!userId) {
    return res.status(400).json({
      detail: "Task not found."
    })
  }
  const db = router.db
  const tasks = db.get('tasks').value()
  if (tasks && tasks.length > 0) {
    const task = tasks[Math.floor(Math.random() * tasks.length)]
    res.json(task)
  } else {
    res.status(404).json({
      detail: "Task not found."
    })
  }
})

// Middleware для POST /task
server.post('/task', (req, res) => {
  const { user_id, task_id, image_url, text, skip_task } = req.body
  if (!user_id || !task_id) {
    return res.status(400).json({
      detail: "Task not found."
    })
  }
  res.json({
    detail: "Task updated successfully."
  })
})

// Middleware для /info/levels
server.get('/info/levels', (req, res) => {
  const db = router.db
  const levels = db.get('levels').value()
  res.json(levels)
})

// Middleware для /info/rules
server.get('/info/rules', (req, res) => {
  const db = router.db
  const rules = db.get('info').get('rules').value()
  res.json(rules)
})

// Middleware для /info/balance
server.get('/info/balance', (req, res) => {
  const db = router.db
  const balance = db.get('info').get('balance').value()
  res.json(balance)
})

// Middleware для /info/referrals
server.get('/info/referrals', (req, res) => {
  const db = router.db
  const referrals = db.get('info').get('referrals').value()
  res.json(referrals)
})

// Middleware для /info/withdraw
server.get('/info/withdraw', (req, res) => {
  const db = router.db
  const withdraw = db.get('info').get('withdraw').value()
  res.json(withdraw)
})

// POST /withdraw
server.post('/withdraw', (req, res) => {
  const { user_id, card_number, bank_name } = req.body
  if (!user_id || !card_number || !bank_name) {
    return res.status(400).json({
      detail: "Invalid bank name or card number."
    })
  }
  const db = router.db
  const existingRequest = db.get('withdrawals').find({ user_id: user_id, status: 'pending' }).value()
  if (existingRequest) {
    return res.status(409).json({
      detail: "Withdrawal request already submitted. Please wait until it's processed."
    })
  }
  db.get('withdrawals').push({ user_id, card_number, bank_name, status: 'pending' }).write()
  res.json({
    detail: "Withdrawal successful."
  })
})

// Middleware для /info/promotion?user_id=1
server.get('/info/promotion', (req, res) => {
  const userId = req.query.user_id
  if (!userId) {
    return res.status(400).json({
      detail: "User not found."
    })
  }
  const db = router.db
  const user = db.get('users').find({ user_id: parseInt(userId) }).value()
  if (!user) {
    return res.status(404).json({
      detail: "User not found."
    })
  }
  if (user.user_type !== 'musician') {
    return res.status(403).json({
      detail: "Access denied. User is not a musician."
    })
  }
  const promotion = db.get('info').get('promotion').value()
  res.json(promotion)
})

// Используем стандартный роутер
server.use(router)

server.listen(port, () => {
  console.log('JSON Server is running')
})
