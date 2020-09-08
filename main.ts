import express from 'express'
import cors from 'cors'
import multer from 'multer'
import { grantPermission, cwebp } from './src/index'
const app = express()
const port = 8000

app.use(cors())

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/images`)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9)
    cb(null, `${uniqueSuffix}.${file.mimetype.split('/')[1]}`)
  }
})

const upload = multer({ storage })

app.post('/upload', upload.any(), (req, res) => {
  res.status(200)
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
