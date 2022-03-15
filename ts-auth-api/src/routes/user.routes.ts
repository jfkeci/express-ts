import express from 'express'

const router = express.Router()

router.post('/users', (req, res) => {
    res.send('User')
})

export default router