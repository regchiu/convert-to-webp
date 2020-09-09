import express from 'express'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { grantPermission, cwebp } from '../src/index'
const app = express()
const port = 8000

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../images'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9)
    cb(null, `${uniqueSuffix}.${file.mimetype.split('/')[1]}`)
  }
})

const upload = multer({ storage })

const filenameList: string[] = []


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../www/index.html'))
})

app.post('/upload', upload.any(), (req, res) => {
  const filename = (req.files as any)[0].filename
  filenameList.push(filename)
  res.status(200).json('OK')
})

app.get('/download', (req, res) => {
  try {
    console.log(filenameList)
    if (filenameList.length > 0) {
      filenameList.forEach(async () => {
        const file = filenameList.shift()
        grantPermission()
        const newFile = `${file!.split('.')[0]}.webp`
        await cwebp(
          path.join(__dirname, `../images/${file}`),
          path.join(__dirname, `../images/${newFile}`),
          '-q 80'
        )
        res.download(path.join(__dirname, `../images/${newFile}`), () => {
          try {
            fs.unlinkSync(path.join(__dirname, `../images/${file}`))
            fs.unlinkSync(path.join(__dirname, `../images/${newFile}`))
          } catch (error) {
            console.log(error)
            throw new Error(error)
          }
        })
      })
    } else {
      res.status(200).send('There is nothing to download 😀')
    }
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})

module.exports = app
